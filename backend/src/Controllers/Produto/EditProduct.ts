import { Request, Response } from "express";
import prisma from "../../database";
import cloudinary from "../../config/cloudinary";

class EditProduct {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

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
    } = req.body;

    try {
      if (!id) return res.status(400).json({ message: "ID do produto é obrigatório" });

      const productExists = await prisma.product.findUnique({
        where: { id },
      });

      if (!productExists) return res.status(404).json({ message: "Produto não existe" });

      let imageUrl = productExists.Image;

      if (req.file) {
        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              imageUrl = result?.secure_url || productExists.Image;
              resolve();
            }
          );
          stream.end(req.file!.buffer);
        });
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name: name ?? productExists.name,
          description: description ?? productExists.description,
          idCategory: idCategory ?? productExists.idCategory,
          idProductLine: idProductLine ?? productExists.idProductLine,
          colorLineId: colorLineId ?? productExists.colorLineId,
          productCapacityId: productCapacityId ?? productExists.productCapacityId,
          Dimensions: Dimensions ?? productExists.Dimensions,
          Materials: Materials ?? productExists.Materials,
          OtherFeatures: OtherFeatures ?? productExists.OtherFeatures,
          Weight: Weight ?? productExists.Weight,
          Code: Code ?? productExists.Code,
          NCM: NCM ?? productExists.NCM,
          EAN: EAN ?? productExists.EAN,
          Image: imageUrl,
        },
      });

      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao editar produto", error: error.message });
    }
  }
}

export { EditProduct };
