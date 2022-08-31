import { Request, Response, Router } from "express";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

const userRoutes = Router();

userRoutes.post("/create", (req: Request, res: Response) => {
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar,
  };

  UserModel.create(user)
    .then((newUser) => {
      res.json({
        ok: true,
        newUser,
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
