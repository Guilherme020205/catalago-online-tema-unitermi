import { Request, Response } from "express";
import prisma from "../../database";

class DeleteColorLine {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    try {

        if (!id) {
        return res.status(401).json({ message: "error edit color line" });
      }

      const deleteColorLine = await prisma.colorLine.delete({
        where: { id: id }
      });

      res
        .status(200)
        .json({ message: "Delete Color Line: ", deleteColorLine });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {DeleteColorLine};