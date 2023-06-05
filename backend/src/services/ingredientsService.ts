import { PoolConnection, RowDataPacket } from "mysql2/promise";
import pool from "../db";

export async function createIngredient(
  name: string,
  description: string,
  image: string,
  value: number,
  type: string,
  is_chef: boolean
) {
  let connection: PoolConnection | undefined;
  try {
    connection = await pool.getConnection();

    const [result] = await connection.execute<RowDataPacket[]>(
      "INSERT INTO ingredients (name, description, image, value, type, is_chef) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, image, value, type, is_chef]
    );
    const productId = (result as RowDataPacket).insertId;
    return { id: productId, name, description, image, value, type, is_chef };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getAllIngredientsService() {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute("SELECT * FROM ingredients");
    return rows;
  } catch (error) {
    throw new Error("Erro ao recuperar os produtos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function deleteIngredientByIdService(ingredientId: number) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.execute("DELETE FROM ingredients WHERE id = ?", [
      ingredientId,
    ]);
  } catch (error) {
    throw new Error("Erro ao excluir o produto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function updateIngredientByIdService(
  ingredientId: number,
  updatedIngredient: {
    name: string;
    description: string;
    image: string;
    value: number;
    type: string;
    is_chef: boolean;
  }
) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.execute(
      "UPDATE ingredients SET name = ?, description = ?, image = ?, value = ?, type = ?, is_chef = ? WHERE id = ?",
      [
        updatedIngredient.name,
        updatedIngredient.description,
        updatedIngredient.image,
        updatedIngredient.value,
        updatedIngredient.type,
        updatedIngredient.is_chef,
        ingredientId,
      ]
    );
  } catch (error) {
    throw new Error("Erro ao atualizar o ingrediente");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
