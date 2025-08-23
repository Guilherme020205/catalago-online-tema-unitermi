import { Request, Response } from "express";
import prisma from "../../database";

class ListProductCapacity {
  async handle(req: Request, res: Response) {
    try {
      const productCapacitys = await prisma.productCapacity.findMany();

      if (productCapacitys.length === 0) {
        return res.status(404).json({ message: "No product Capacitys found" });
      }

      res.status(200).json({ message: "List of Product Capacitys", productCapacitys });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {ListProductCapacity};