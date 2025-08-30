import { Request, Response } from "express";
import prisma from "../../../database";

class ListProductsSuggestions {
  async handle(req: Request, res: Response) {
    const { category } = req.query;

    try {
      let whereClause = "";
      const params: any[] = [];

      if (category) {
        whereClause = `WHERE p."idCategory" = $1`;
        params.push(category);
      }

      const products = await prisma.$queryRawUnsafe(
        `
  SELECT 
    p.*, 
    pl."name" AS "productLineName",
    c."name"  AS "categoryName",
    cl."name" AS "colorLineName",
    pc."capacity" AS "capacityName"
  FROM "products" p
  LEFT JOIN "productLine" pl ON p."idProductLine" = pl.id
  LEFT JOIN "category"   c  ON p."idCategory" = c.id
  LEFT JOIN "corLine"    cl ON p."colorLineId" = cl.id
  LEFT JOIN "productCapacity" pc ON p."productCapacityId" = pc.id
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
