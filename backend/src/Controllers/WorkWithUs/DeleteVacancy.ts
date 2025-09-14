import { Request, Response } from "express";
import prisma from "../../database";

class DeleteVacancy {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const vacancy = await prisma.vacancy.findUnique({
        where: { id },
      });

      if (!vacancy) {
        return res.status(404).json({ message: "Vacancy not found" });
      }

      await prisma.vacancy.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Vacancy deleted successfully" });
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteVacancy };
