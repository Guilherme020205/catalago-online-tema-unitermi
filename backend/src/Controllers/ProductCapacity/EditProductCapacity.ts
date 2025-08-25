import { Request, Response } from "express";
import prisma from "../../database";

class EditProductCapacity {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { capacity } = req.body;

    try {
      if (!id || !capacity) {
        return res.status(401).json({ message: "error edit product Capacity" });
      }
      
      const productCapacityExist = await prisma.productCapacity.findUnique({
        where: { capacity: capacity },
      });

      if (productCapacityExist) {
        return res.status(404).json({ message: "This product Capacity already exists" });
      }

      const editProductCapacity = await prisma.productCapacity.update({
        where: { id: id },
        data: { capacity: capacity },
      });

      res
        .status(200)
        .json({ message: "Edit Product Capacity: ", editProductCapacity });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { EditProductCapacity };
