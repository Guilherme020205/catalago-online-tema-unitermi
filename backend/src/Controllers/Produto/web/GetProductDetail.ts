import { Request, Response } from "express";
import prisma from "../../../database";

class GetProductDetail {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      // Produto principal
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          Category: true,
          ProductLine: true,
          ColorLine: true,
          ProductCapacity: true,
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      // Todas variações do mesmo ProductLine
      const variations = await prisma.product.findMany({
        where: {
          idProductLine: product.idProductLine,
        },
        include: {
          ColorLine: true,
          ProductCapacity: true,
        },
      });

      res.status(200).json({ product, variations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
}

export { GetProductDetail };
