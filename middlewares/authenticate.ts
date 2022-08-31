import { NextFunction, Response, Request } from "express";
import Token from "../classes/token";
import { UserDB } from "../models/user.model";
import { pick } from "lodash";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDB;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.get("Authorization") || "Bearer ";
  const parsedToken = userToken.split(" ")[1];

  Token.checkToken(parsedToken)
    .then((decoded: unknown) => {
      req.user = (pick(decoded, "user") as { user: UserDB }).user;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.json({
        ok: false,
        error: "Invalid token",
      });
    });
};
