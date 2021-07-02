import { Request, Response } from "express";

import { api } from "../../services/api";

class Pokemon {
  async index(request: Request, response: Response) {
    const { limit, offset = 0 } = request.query;

    const { data } = await api.get("pokemon", {
      params: {
        limit,
        offset,
      },
    });

    return response.json(data);
  }

  async show(request: Request, response: Response) {
    const { pokemonId } = request.params;
    const { data } = await api.get(`pokemon/${pokemonId}`);

    const { id, name, types, sprites, height, weight, abilities } = data;

    const heightInCentimeters = height * 10;
    const weightInGrams = weight * 100;

    const typeNames = types.map(({ type }) => {
      return type.name;
    });

    const abilitiesNames = abilities.map(({ ability }) => {
      return ability.name;
    });

    const imageUrl =
      sprites.other["official-artwork"].front_default || sprites.front_default;

    return response.json({
      id,
      name,
      height: heightInCentimeters,
      weight: weightInGrams,
      image_url: imageUrl,
      types: typeNames,
      abilities: abilitiesNames,
    });
  }
}

export default new Pokemon();
