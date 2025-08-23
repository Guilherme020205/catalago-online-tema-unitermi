import { Request, Response } from "express";
import prisma from "../../database";

class DeleteProductCapacity {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    try {

        if (!id) {
        return res.status(401).json({ message: "error edit product Capacity" });
      }

      const deleteProductCapacity = await prisma.productCapacity.delete({
        where: { id: id }
      });

      res
        .status(200)
        .json({ message: "Delete Product Capacity: ", deleteProductCapacity });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {DeleteProductCapacity};