import { Router } from "express";

import { loginController } from "./Controllers/Login/loginController";

const router = Router();

router.post("/login", new loginController().handle);

export default router;
