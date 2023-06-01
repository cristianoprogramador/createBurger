import { Request, Response } from "express";
import { createProduct } from "../services/productsService";

export async function createProductController(req: Request, res: Response) {
  try {
    const { name, description, image, value } = req.body;
    const product = await createProduct(name, description, image, value);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar o produto" });
  }
}
