import { Request, Response } from "express";
import prisma from "../../database";

class DeleteColorLine {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(401).json({ message: "error delete color line" });
      }

      const colorInUse = await prisma.product.findFirst({
        where: { colorLineId: id },
      });

      if (colorInUse) {
        return res.status(400).json({
          message: "Não é possível excluir: esta cor está em uso em produtos.",
        });
      }

      const deleteColorLine = await prisma.colorLine.delete({
        where: { id: id },
      });

      return res
        .status(200)
        .json({ message: "Delete Color Line: ", deleteColorLine });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { DeleteColorLine };
