import { Request, Response } from "express";
import prisma from "../../database";

class ProductLineController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    try {
      if (!name) {
        return res.status(401).json({ message: "error creating product line" });
      }

      const creatProductLine = await prisma.productLine.create({
        data: {
          name: name,
        },
      });

      res
        .status(200)
        .json({ message: "Creat Product Line: ", creatProductLine });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ProductLineController };
