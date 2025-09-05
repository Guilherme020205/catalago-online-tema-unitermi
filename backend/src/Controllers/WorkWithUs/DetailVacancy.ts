import { Request, Response } from "express";
import prisma from "../../database"; 

class DetailVacancy {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const vacancy = await prisma.vacancy.findMany({
        where: { id: id },
      });

      return res.status(200).json(vacancy);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao detalhar a vaga",
        error,
      });
    }
  }
}

export { DetailVacancy };
