import { Request, Response } from "express";
import prisma from "../../database";

class DeleteProductCapacity {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!id) {
        return res
          .status(401)
          .json({ message: "error delete product capacity" });
      }

      const inUse = await prisma.product.findFirst({
        where: { productCapacityId: id },
      });

      if (inUse) {
        return res.status(400).json({
          message:
            "Não é possível excluir: esta capacidade está em uso em produtos.",
        });
      }

      const deleteProductCapacity = await prisma.productCapacity.delete({
        where: { id: id },
      });

      return res
        .status(200)
        .json({ message: "Delete Product Capacity: ", deleteProductCapacity });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteProductCapacity };
