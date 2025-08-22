import { Request, Response } from "express";
import prisma from "../../database";

class ListProductLine {
  async handle(req: Request, res: Response) {
    try {
      const productLines = await prisma.productLine.findMany();

      if (productLines.length === 0) {
        return res.status(404).json({ message: "No product lines found" });
      }

      res.status(200).json({ message: "List of Product Lines", productLines });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {ListProductLine};