import { Request, Response } from "express";
import {
  createOrder,
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
    console.log("UE DEU CERTO?");
    res.status(201).json({ orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao criar o pedido" });
  }
};
