import { Request, Response } from "express";
import prisma from "../../database";

class ListColorLine {
  async handle(req: Request, res: Response) {
    try {
      const colorLines = await prisma.colorLine.findMany();

      if (colorLines.length === 0) {
        return res.status(404).json({ message: "No color lines found" });
      }

      res.status(200).json({ message: "List of Color Lines", colorLines });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {ListColorLine};