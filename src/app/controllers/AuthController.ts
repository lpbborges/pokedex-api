import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { jwtConfig } from "../../constants";
import { UserModel } from "../models/User";

class AuthController {
  async signIn(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return response.status(400).json({ error: "Wrong credentials provided" });
    }

    const isPasswordMatching = await compare(password, user.password_hash);

    if (!isPasswordMatching) {
      return response.status(400).json({ error: "Wrong credentials provided" });
    }

    const { id } = user;

    return response.json({
      user: {
        id,
        username,
      },
      token: sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
