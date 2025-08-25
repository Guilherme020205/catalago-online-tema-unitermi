import { Request, Response } from "express";
import prisma from "../../database";

class ListCategory {
  async handle(req: Request, res: Response) {
    try {
      const Categorys = await prisma.category.findMany();

      if (Categorys.length === 0) {
        return res.status(404).json({ message: "No Category lines found" });
      }

      res.status(200).json({ message: "List of Category Lines", Categorys });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {ListCategory};