import { Request, Response } from "express";
import prisma from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class loginController {
  async handle(req: Request, res: Response) {
    const { user, password } = req.body;

    try {
      const userExist = await prisma.user.findUnique({
        where: { user: user },
      });

      if (!userExist) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: userExist.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "244h",
        }
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { loginController };
