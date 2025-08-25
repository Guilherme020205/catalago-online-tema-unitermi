import { Request, Response } from "express";
import prisma from "../../database";

class CreateProductCapacity {
  async handle(req: Request, res: Response) {
    const { capacity } = req.body;
    try {
      if (!capacity) {
        return res.status(401).json({ message: "error creating product Capacity" });
      }

      const creatProductCapacity = await prisma.productCapacity.create({
        data: {
          capacity: capacity
        },
      });

      res
        .status(200)
        .json({ message: "Creat Product Capacity: ", creatProductCapacity });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateProductCapacity };
