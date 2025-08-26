import { Request, Response } from "express";
import prisma from "../../database";

class CreateProduct {
  async handle(req: Request, res: Response) {
    const {
      name,
      description,
      idCategory,
      idProductLine,
      colorLineId,
      productCapacityId,
      Dimensions,
      Materials,
      OtherFeatures,
      Weight,
      Code,
      NCM,
      EAN,
      Image,
    } = req.body;

    try {
      if (
        !name ||
        !description ||
        !idCategory ||
        !idProductLine ||
        !Image ||
        !colorLineId
      ) {
        return res.status(400).json({
          message: "error creating product",
        });
      }
      const existingProduct = await prisma.product.findFirst({
        where: {
          idCategory,
          idProductLine,
          colorLineId,
          productCapacityId,
        },
      });
      if (existingProduct) {
        return res.status(400).json({
          error:
            "Já existe um produto com essa cor e capacidade nessa categoria e linha.",
        });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          idCategory,
          idProductLine,
          colorLineId: colorLineId,
          productCapacityId: productCapacityId || null,
          Dimensions: Dimensions || null,
          Materials: Materials || null,
          OtherFeatures: OtherFeatures || null,
          Weight: Weight || null,
          Code: Code || null,
          NCM: NCM || null,
          EAN: EAN || null,
          Image: Image,
        },
      });

      return res.status(201).json(product);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "error creating product" });
    }
  }
}

export { CreateProduct };
