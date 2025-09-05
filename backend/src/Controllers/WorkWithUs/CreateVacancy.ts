import { Request, Response } from "express";
import prisma from "../../database";

class CreateVacancy {
  async handle(req: Request, res: Response) {
    const { title, description, requirements, benefits, wage } = req.body;
    try {
      if (!title || !description || !requirements || !benefits || !wage) {
        return res.status(400).json({
          message: "Dados obrigatórios faltando",
        });
      }

      const vacancy = await prisma.vacancy.create({
        data: {
          title,
          description: description.replace(/\r\n/g, "\n"),
          requirements: requirements.replace(/\r\n/g, "\n"),
          benefits: benefits.replace(/\r\n/g, "\n"),
          wage: Number(wage) || 0,
        },
      });

      return res.status(201).json(vacancy);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao criar vaga", error: error });
    }
  }
}

export { CreateVacancy };
