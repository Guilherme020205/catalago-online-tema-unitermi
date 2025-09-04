import { Request, Response } from "express";
import prisma from "../../database";
import { Prisma } from "@prisma/client";

class ListProductsByName {
  async handle(req: Request, res: Response) {
    const { name, page = 1, limit = 30 } = req.query;

    // Monta o filtro dinamicamente
    const filter: Prisma.ProductWhereInput = {};
    if (name) {
      filter.name = {
        contains: String(name),
        mode: "insensitive",
      };
    }

    try {
      const products = await prisma.product.findMany({
        where: filter,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        include: {
          Category: true,
          ColorLine: true,
          ProductCapacity: true,
          ProductLine: true,
        },
      });

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

export { ListProductsByName };
