import { Request, Response } from "express";
import prisma from "../../database";
import cloudinary from "../../config/cloudinary";

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
    } = req.body;

    try {
      if (!name || !description || !idCategory || !idProductLine || !colorLineId) {
        return res.status(400).json({
          message: "Dados obrigatórios faltando",
        });
      }

      // 🔍 Verifica duplicidade
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

      // 📤 Upload da imagem no Cloudinary
      let imageUrl: string | null = null;
      if (req.file) {
        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              imageUrl = result?.secure_url || null;
              resolve();
            }
          );
          stream.end(req.file!  .buffer);
        });
      }

      // 📝 Criação no banco
      const product = await prisma.product.create({
        data: {
          name,
          description,
          idCategory,
          idProductLine,
          colorLineId: colorLineId,
          productCapacityId: productCapacityId || null,
          Dimensions: Dimensions || "",
          Materials: Materials || "",
          OtherFeatures: OtherFeatures || "",
          Weight: Weight || "",
          Code: Code || "",
          NCM: NCM || "",
          EAN: EAN || "",
          Image: imageUrl || "", // salva URL do Cloudinary
        },
      });

      return res.status(201).json(product);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar produto", error: error.message });
    }
  }
}

export { CreateProduct };
