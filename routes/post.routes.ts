import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/authenticate";
import { Post } from "../models/post.model";
import { UploadedFile } from "express-fileupload";

const postRoutes = Router();

postRoutes.post("/", [verifyToken], async (req: Request, res: Response) => {
  const body = req.body;

  body.user = req.user?._id;

  const post = await Post.create(body);

  await post.populate("user", "-password");

  res.json({ ok: true, post });
});

postRoutes.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip *= 10;

  const posts = await Post.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(10)
    .populate("user", "-password")
    .exec();

  res.json({ ok: true, page, posts });
});

postRoutes.post(
  "/upload",
  [verifyToken],
  async (req: Request, res: Response) => {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ ok: false, error: "Bad request" });
    }

    const file: UploadedFile = req.files.image as UploadedFile;

    if (!file.mimetype.includes("image")) {
      return res
        .status(400)
        .json({ ok: false, error: "Only images are allowed" });
    }

    res.json({ ok: true, file: file.mimetype });
  }
);

export default postRoutes;
