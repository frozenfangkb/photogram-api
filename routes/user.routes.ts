import { Request, Response, Router } from "express";

const userRoutes = Router();

userRoutes.get("/test", (req: Request, res: Response) => {
  res.json({ ok: true, message: "Service working OK" });
});

export default userRoutes;
