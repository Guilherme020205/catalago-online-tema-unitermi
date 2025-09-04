import { Request, Response } from "express";
import prisma from "../../database";

class CreateProductLine {
  async handle(req: Request, res: Response) {
    const { name, idCategory } = req.body;
    try {
      if (!name || !idCategory) {
        return res.status(401).json({ message: "error creating product line" });
      }

      const categoryExists = await prisma.category.findUnique({
        where: { id: idCategory },
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "Category not Exist" });
      }

      const creatProductLine = await prisma.productLine.create({
        data: {
          name: name,
          idCategory: idCategory,
        },
      });

      res
        .status(200)
        .json({ message: "Creat Product Line: ", creatProductLine });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { CreateProductLine };
