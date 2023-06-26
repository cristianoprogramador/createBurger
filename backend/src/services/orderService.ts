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

export async function getAllOrdersByTypeService(email: string) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "SELECT * FROM orders o JOIN orders_details od ON o.id = od.pedido_id WHERE o.email = ?",
      [email]
    );
    return rows;
  } catch (error) {
    throw new Error("Erro ao recuperar os pedidos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getAllOrders() {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "SELECT * FROM orders o JOIN orders_details od ON o.id = od.pedido_id"
    );
    return rows;
  } catch (error) {
    throw new Error("Erro ao recuperar os pedidos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function changeStatusOrder(id: any, status: string) {
  let connection: PoolConnection | undefined;
  console.log(id, status);

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );
    return rows;
  } catch (error) {
    throw new Error("Erro ao recuperar os pedidos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
