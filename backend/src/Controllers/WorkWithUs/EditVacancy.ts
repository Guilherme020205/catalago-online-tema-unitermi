import { Request, Response } from "express";
import prisma from "../../database";

class EditVacancy {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, requirements, benefits, wage } = req.body;
    try {
      if (!title || !description || !requirements || !benefits || !wage) {
        return res.status(400).json({
          message: "Dados obrigatórios faltando",
        });
      }

      const vacancy = await prisma.vacancy.update({
        where: {
          id: id,
        },
        data: {
          title,
          description: description.replace(/\r\n/g, "\n"),
          requirements,
          benefits,
          wage: Number(wage) || 0,
        },
      });

      return res.status(201).json(vacancy);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao editar vaga", error: error });
    }
  }
}

export { EditVacancy };
