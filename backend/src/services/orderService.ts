import { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import pool from "../db";
import { Order, OrderDetail } from "../models/orderModel";

export const createOrder = async (
  order: Order,
  orderDetails: OrderDetail[]
): Promise<number> => {
  const connection: PoolConnection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query("INSERT INTO orders SET ?", [
      order,
    ]);
    const orderId = (result as RowDataPacket).insertId;
    for (const detail of orderDetails) {
      detail.pedido_id = orderId; // Adiciona o ID do pedido aos detalhes do pedido
      await connection.query("INSERT INTO orders_details SET ?", [detail]);
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
