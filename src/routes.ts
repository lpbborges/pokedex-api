import { Router } from "express";

const routes = Router();

routes.use("/", (request, response) => {
  response.json({ message: "ok" });
});

export default routes;
