import { Request, Response } from "express";
import prisma from "../../database";

class ListProducts {
  async handle(req: Request, res: Response) {
    const { category, page = 1, limit = 8 } = req.query; // valores padrão

    try {
      const filter: any = {};
      if (category) filter.idCategory = String(category);

      const products = await prisma.product.findMany({
        where: filter,
        distinct: ["idProductLine"],
        skip: (Number(page) - 1) * Number(limit), // pula registros
        take: Number(limit), // quantidade por página
        include: {
          Category: true,
          ColorLine: true,
          ProductCapacity: true,
          ProductLine: true,
        },
      });

      // total de produtos (pra calcular páginas)
      const total = await prisma.product.count({ where: filter });

      res.status(200).json({
        message: "List of Products",
        products,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ListProducts };
