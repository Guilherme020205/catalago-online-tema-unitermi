import { Request, Response } from "express";
import prisma from "../../database";
import { Prisma } from "@prisma/client";

class ListVacancys {
  async handle(req: Request, res: Response) {
    const { title, page = 1, limit = 30 } = req.query;

    const filter: Prisma.VacancyWhereInput = {};
    if (title) {
      filter.title = {
        contains: String(title),
        mode: "insensitive",
      };
    }

    try {
      const vacancys = await prisma.vacancy.findMany({
        where: filter,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
          createAt: "desc",
        },
      });

      const total = await prisma.vacancy.count({ where: filter });

      return res.status(200).json({
        message: "Lista de Vagas",
        vacancys,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao listar vagas",
        error,
      });
    }
  }
}

export { ListVacancys };
