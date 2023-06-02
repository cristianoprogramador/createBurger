import { PoolConnection, RowDataPacket } from "mysql2/promise";
import pool from "../db";

export async function createProduct(
  name: string,
  description: string,
  image: string,
  value: number
) {
  let connection: PoolConnection | undefined;
  try {
    connection = await pool.getConnection();

    const [result] = await connection.execute<RowDataPacket[]>(
      "INSERT INTO products (name, description, image, value) VALUES (?, ?, ?, ?)",
      [name, description, image, value]
    );
    const productId = (result as RowDataPacket).insertId;
    return { id: productId, name, description, image, value };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getAllProductsService() {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw new Error("Erro ao recuperar os produtos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function deleteProductByIdService(productId: number) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.execute("DELETE FROM products WHERE id = ?", [productId]);
  } catch (error) {
    throw new Error("Erro ao excluir o produto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function updateProductByIdService(
  productId: number,
  updatedProduct: {
    name: string;
    description: string;
    image: string;
    value: number;
  }
) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.execute(
      "UPDATE products SET name = ?, description = ?, image = ?, value = ? WHERE id = ?",
      [
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.image,
        updatedProduct.value,
        productId,
      ]
    );
  } catch (error) {
    throw new Error("Erro ao atualizar o produto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
