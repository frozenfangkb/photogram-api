import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/authenticate";
import { Post, PostDB } from "../models/post.model";

const postRoutes = Router();

postRoutes.post("/", [verifyToken], async (req: Request, res: Response) => {
  const body = req.body;

  body.user = req.user?._id;

  const post = await Post.create(body);

  await post.populate("user", "-password");

  res.json({ ok: true, post });
});

export default postRoutes;
