import { Request, Response } from "express";
import prisma from "../../database";

class ListProducts {
  async handle(req: Request, res: Response) {
    const { category } = req.query;

    try {
      // Cria o filtro dinamicamente
      const filter: any = {};
      if (category) filter.idCategory = String(category);

      const products = await prisma.product.findMany({
        where: filter,
        include: {
          Category: true,
          ColorLine: true,
          ProductCapacity: true,
          ProductLine: true
        }
      });

      res.status(200).json({ message: "List of Products", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ListProducts };
