import { Request, Response } from "express";
import prisma from "../../database";

class EditCategory {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      if (!id && !name) {
        return res.status(401).json({ message: "error edit Category line" });
      }
      
      const CategoryExist = await prisma.category.findUnique({
        where: { name: name },
      });

      if (CategoryExist) {
        return res.status(404).json({ message: "This Category line already exists" });
      }

      const editCategory = await prisma.category.update({
        where: { id: id },
        data: { name: name },
      });

      res
        .status(200)
        .json({ message: "Edit Category Line: ", editCategory });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { EditCategory };
