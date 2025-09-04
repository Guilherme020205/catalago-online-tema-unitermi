import { Request, Response } from "express";
import prisma from "../../database";

class CreateColorLine {
  async handle(req: Request, res: Response) {
    const { name, code } = req.body;
    try {
      if (!name || !code) {
        return res.status(401).json({ message: "error creating product line" });
      }
       

      const creatColorLine = await prisma.colorLine.create({
        data: {
          name: name,
          code: code
        },
      });

      res
        .status(200)
        .json({ message: "Creat Color Line: ", creatColorLine });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateColorLine };
