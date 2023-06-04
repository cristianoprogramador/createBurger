import { Request, Response } from "express";
import {
  createIngredient,
  deleteIngredientByIdService,
  getAllIngredientsService,
  updateIngredientByIdService,
} from "../services/ingredientsService";

export async function createIngredientsController(req: Request, res: Response) {
  try {
    const { name, description, image, value } = req.body;
    const product = await createIngredient(name, description, image, value);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar o ingrediente" });
  }
}

export async function getAllIngredientsController(req: Request, res: Response) {
  try {
    const products = await getAllIngredientsService();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao recuperar os ingredientes:", error);
    res.status(500).json({ error: "Erro ao recuperar os ingredientes" });
  }
}

export async function deleteIngredientByIdController(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  try {
    await deleteIngredientByIdService(Number(id));
    res.status(200).json({ message: "ingrediente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o ingrediente:", error);
    res.status(500).json({ error: "Erro ao excluir o ingrediente" });
  }
}

export async function updateIngredientByIdController(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const { name, description, image, value } = req.body;

  try {
    await updateIngredientByIdService(Number(id), {
      name,
      description,
      image,
      value,
    });
    res.status(200).json({ message: "Ingrediente atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o ingrediente:", error);
    res.status(500).json({ error: "Erro ao atualizar o ingrediente" });
  }
}
