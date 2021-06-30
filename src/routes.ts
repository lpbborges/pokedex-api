import { Router } from "express";

import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/auth";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/sign-in", AuthController.signIn);

routes.use(authMiddleware);

export default routes;
