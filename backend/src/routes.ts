import { Router } from "express";
import { authentcate } from "./middlewares/authMiddleware";

import { loginController } from "./Controllers/Login/loginController";

const router = Router();

router.post("/login", new loginController().handle);

router.get("/", authentcate, (req, res) => {
  res.json({ message: "token ok" });
});
export default router;
