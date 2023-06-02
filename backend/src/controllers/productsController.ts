import { Request, Response } from "express";
import {
  createProduct,
  deleteProductByIdService,
  getAllProductsService,
  updateProductByIdService,
} from "../services/productsService";

export async function createProductController(req: Request, res: Response) {
  try {
    const { name, description, image, value } = req.body;
    const product = await createProduct(name, description, image, value);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar o produto" });
  }
}

export async function getAllProductsController(req: Request, res: Response) {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao recuperar os produtos:", error);
    res.status(500).json({ error: "Erro ao recuperar os produtos" });
  }
}

export async function deleteProductByIdController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteProductByIdService(Number(id));
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    res.status(500).json({ error: "Erro ao excluir o produto" });
  }
}

export async function updateProductByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, image, value } = req.body;

  try {
    await updateProductByIdService(Number(id), {
      name,
      description,
      image,
      value,
    });
    res.status(200).json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
}
