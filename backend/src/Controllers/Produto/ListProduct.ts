import { Request, Response } from "express";
import prisma from "../../database";

class ListProduct {
  async handle(req: Request, res: Response) {
    try {
      const product = await prisma.product.findMany();

      if (product.length === 0) {
        return res.status(404).json({ message: "No product s found" });
      }

      res.status(200).json({ message: "List of Product s", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {ListProduct};