import { Request, Response } from "express";

import { api } from "../../services/api";

class Pokemon {
  async index(_: Request, response: Response) {
    const { data } = await api.get("pokemon");

    return response.json(data);
  }

  async show(request: Request, response: Response) {
    const { pokemonId } = request.params;
    const { data } = await api.get(`pokemon/${pokemonId}`);

    const { id, order, name, types } = data;

    const onlyTypeNames = types.map(({ type }) => {
      return type.name;
    });

    return response.json({ id, order, name, types: onlyTypeNames });
  }
}

export default new Pokemon();
