import { hash } from "bcrypt";
import { Request, Response } from "express";
import * as Yup from "yup";

import { UserModel } from "../models/User";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }

    const { password } = request.body;

    const userExists = await UserModel.findOne({
      username: request.body.username,
    }).exec();

    if (userExists) {
      return response
        .status(400)
        .json({ error: "User with that username already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const { id, username } = await UserModel.create({
      ...request.body,
      password_hash: hashedPassword,
    });

    return response.status(201).json({
      id,
      username,
    });
  }
}

export default new UserController();
