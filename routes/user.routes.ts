import { Request, Response, Router } from "express";
import { IUser, User, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";

const userRoutes = Router();

userRoutes.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  UserModel.findOne({ email: body.email }, (err: unknown, us: IUser) => {
    if (err) throw err;
    if (!us) {
      res.json({
        ok: false,
        error: "User or password are invalid",
      });
    }

    if (us.validatePassword(body.password)) {
      const userToken = Token.getJwtToken({
        _id: us.id,
        name: us.name,
        email: us.email,
        avatar: us.avatar,
      });

      res.json({
        ok: true,
        token: userToken,
      });
    } else {
      res.json({
        ok: false,
        error: "User or password are invalid",
      });
    }
  });
});

userRoutes.post("/create", (req: Request, res: Response) => {
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar,
  };

  UserModel.create(user)
    .then((newUser) => {
      const userToken = Token.getJwtToken({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      });

      res.json({
        ok: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res
        .json({
          ok: false,
          error: err,
        })
        .status(500);
    });
});

export default userRoutes;
