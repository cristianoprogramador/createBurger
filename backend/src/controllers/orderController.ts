import { Request, Response } from "express";
import {
  changeStatusOrder,
  createOrder,
  getAllOrders,
  getAllOrdersByTypeService,
} from "../services/orderService";

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { order, orderDetails } = req.body;
    const orderId = await createOrder(order, orderDetails);
    res.status(201).json({ message: "Pedido criado com sucesso", orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o pedido" });
  }
};

export const getOrderByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;
    const orderId = await getAllOrdersByTypeService(email);
    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o pedido" });
  }
};

export const getAllOrdersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = await getAllOrders();
    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao buscar todos os pedidos" });
  }
};

export const changeOrderStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orderId = await changeStatusOrder(id, status);
    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao buscar todos os pedidos" });
  }
};
