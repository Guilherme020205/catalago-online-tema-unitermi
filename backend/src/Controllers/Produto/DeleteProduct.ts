import { Request, Response } from "express";
import prisma from "../../database";

class DeleteProduct {
  async handle(req: Request, res: Response) {
    const {id} = req.params;

    try {

        if (!id) {
        return res.status(401).json({ message: "error edit product " });
      }

      const deleteProduct = await prisma.product.delete({
        where: { id: id }
      });

      res
        .status(200)
        .json({ message: "Delete Product : ", deleteProduct });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export {DeleteProduct};