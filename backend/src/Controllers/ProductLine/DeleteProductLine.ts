import { Request, Response } from "express";
import prisma from "../../database";

class DeleteProductLine {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(401).json({ message: "error delete product line" });
      }

      // 🔍 Verifica se existe produto usando essa linha
      const inUse = await prisma.product.findFirst({
        where: { idProductLine: id },
      });

      if (inUse) {
        return res.status(400).json({
          message: "Não é possível excluir: esta linha de produto está em uso.",
        });
      }

      const deleteProductLine = await prisma.productLine.delete({
        where: { id: id },
      });

      return res
        .status(200)
        .json({ message: "Delete Product Line: ", deleteProductLine });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteProductLine };
