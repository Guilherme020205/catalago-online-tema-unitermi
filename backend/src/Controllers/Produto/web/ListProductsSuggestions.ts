import { Request, Response } from "express";
import prisma from "../../../database";

class ListProductsSuggestions {
  async handle(req: Request, res: Response) {
    const { category } = req.query;

    try {
      let whereClause = "";
      const params: any[] = [];

      if (category) {
        whereClause = `WHERE "idCategory" = $1`;
        params.push(category);
      }

      const products = await prisma.$queryRawUnsafe(
        `
        SELECT * 
        FROM "products"
        ${whereClause}
        ORDER BY RANDOM()
        LIMIT 4
        `,
        ...params
      );

      res.status(200).json({ message: "List of Products", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ListProductsSuggestions };
