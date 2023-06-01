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
