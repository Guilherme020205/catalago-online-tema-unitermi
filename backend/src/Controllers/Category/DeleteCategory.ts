import { Request, Response } from "express";
import prisma from "../../database";

class DeleteCategory {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    try {

        if (!id) {
        return res.status(401).json({ message: "error edit Category line" });
      }

      const deleteCategory = await prisma.category.delete({
        where: { id: id }
      });

      res
        .status(200)
        .json({ message: "Delete Category Line: ", deleteCategory });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {DeleteCategory};