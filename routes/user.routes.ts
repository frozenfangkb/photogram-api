import { Request, Response, Router } from "express";
import { UserDB, User, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { verifyToken } from "../middlewares/authenticate";

const userRoutes = Router();

userRoutes.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  UserModel.findOne({ email: body.email }, (err: unknown, us: UserDB) => {
    if (err) throw err;
    if (!us) {
      return res.json({
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

userRoutes.put("/update", verifyToken, (req: Request, res: Response) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  };

  UserModel.findByIdAndUpdate(
    req.user?._id,
    newUser,
    { new: true },
    (err, userDB) => {
      if (err) throw err;

      if (!userDB) {
        return res.json({
          ok: false,
          error: "User does not exist",
        });
      }

      const userToken = Token.getJwtToken({
        _id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        avatar: userDB.avatar,
      });

      res.json({
        ok: true,
        token: userToken,
      });
    }
  );
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
