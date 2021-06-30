import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { jwtConfig } from "../../constants";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, jwtConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid JWT token" });
  }
};
