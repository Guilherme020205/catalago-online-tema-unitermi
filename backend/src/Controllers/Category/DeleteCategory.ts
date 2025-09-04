import { Request, Response } from "express";
import prisma from "../../database";

class DeleteCategory {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(401).json({ message: "error delete category line" });
      }

      const categoryInUse = await prisma.product.findFirst({
        where: { idCategory: id },
      });

      if (categoryInUse) {
        return res.status(400).json({
          message:
            "Não é possível excluir: esta categoria está em uso em produtos.",
        });
      }

      const deleteCategory = await prisma.category.delete({
        where: { id: id },
      });

      return res
        .status(200)
        .json({ message: "Delete Category Line: ", deleteCategory });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteCategory };
