import { Request, Response } from "express";
import prisma from "../../database";

class EditColorLine {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, code } = req.body;

    try {
      if (!id && !name) {
        return res.status(401).json({ message: "error edit color line" });
      }

      const colorLineExist = await prisma.colorLine.findUnique({
        where: { name: name, code: code },
      });

      if (colorLineExist) {
        return res
          .status(404)
          .json({ message: "This color line already exists" });
      }

      const editColorLine = await prisma.colorLine.update({
        where: { id: id },
        data: { name: name, code: code },
      });

      res.status(200).json({ message: "Edit Color Line: ", editColorLine });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { EditColorLine };
