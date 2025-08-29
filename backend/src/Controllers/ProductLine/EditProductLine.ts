import { Request, Response } from "express";
import prisma from "../../database";

class EditProductLine {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, idCategory } = req.body;

    try {
      if (!id || !name || !idCategory) {
        return res.status(401).json({ message: "error edit product line" });
      }

      const productLineExist = await prisma.productLine.findFirst({
        where: {
          name,
          idCategory,
          NOT: { id },
        },
      });

      if (productLineExist) {
        return res
          .status(404)
          .json({ message: "This product line already exists" });
      }

      const categoryExists = await prisma.category.findUnique({
        where: { id: idCategory },
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "Category not Exist" });
      }

      const editProductLine = await prisma.productLine.update({
        where: { id: id },
        data: { 
          name: name,
          idCategory: idCategory, // 🔥 agora também atualiza categoria
        },
      });

      res.status(200).json({ message: "Edit Product Line: ", editProductLine });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { EditProductLine };
