import { Request, Response } from "express";

import { api } from "../../services/api";

class Pokemon {
  async index(request: Request, response: Response) {
    const { limit = 12 } = request.query;

    const { data } = await api.get("pokemon", {
      params: {
        limit,
      },
    });

    return response.json(data);
  }

  async show(request: Request, response: Response) {
    const { pokemonId } = request.params;
    const { data } = await api.get(`pokemon/${pokemonId}`);

    const { id, order, name, types, sprites } = data;

    const onlyTypeNames = types.map(({ type }) => {
      return type.name;
    });

    const imageUrl =
      sprites.other["official-artwork"].front_default || sprites.front_default;

    return response.json({
      id,
      order,
      name,
      image_url: imageUrl,
      types: onlyTypeNames,
    });
  }
}

export default new Pokemon();
