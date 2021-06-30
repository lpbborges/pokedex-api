import { Router } from "express";

import AuthController from "./app/controllers/AuthController";
import PokemonController from "./app/controllers/PokemonController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/auth";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/sign-in", AuthController.signIn);

routes.use(authMiddleware);

routes.get("/pokemon", PokemonController.index);
routes.get("/pokemon/:pokemonId", PokemonController.show);

export default routes;
