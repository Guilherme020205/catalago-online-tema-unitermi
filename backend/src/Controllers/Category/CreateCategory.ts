import { Request, Response } from "express";
import prisma from "../../database";

class CreateCategory {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    try {
      if (!name) {
        return res.status(401).json({ message: "error creating Category line" });
      }

      const creatCategory = await prisma.category.create({
        data: {
          name: name,
        },
      });

      res
        .status(200)
        .json({ message: "Creat Category Line: ", creatCategory });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateCategory };
