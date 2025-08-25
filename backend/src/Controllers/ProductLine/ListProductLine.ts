import { Request, Response } from "express";
import prisma from "../../database";

class ListProductLine {
  async handle(req: Request, res: Response) {
    // Pegando o id da query (?id=123)
    const { id } = req.query;

    try {
      let productLines;

      if (id) {
        // Se id foi enviado, filtra pela categoria
        productLines = await prisma.productLine.findMany({
          where: {
            idCategory: String(id), // sempre string
          },
        });
      } else {
        // Se não enviou, pega todas as linhas
        productLines = await prisma.productLine.findMany();
      }

      res.status(200).json({ message: "List of Product Lines", productLines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ListProductLine };
