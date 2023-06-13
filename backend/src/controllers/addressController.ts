import { Request, Response } from "express";
import {
  createOrUpdateAddress,
  getAddressByEmail,
} from "../services/addressService";

export async function createAddressController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = req.params.email;
    const { cep, rua, numero, bairro, cidade, uf } = req.body;
    const orderId = await createOrUpdateAddress(email, {
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
    });
    res.status(201).json({ message: "Endereço criado", orderId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao cadastrar o endereço" });
  }
}

export async function getAddressController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = req.params.email;
    const address = await getAddressByEmail(email);
    if (address) {
      res.status(200).json({ message: "Endereço encontrado", address });
    } else {
      res.status(404).json({ message: "Endereço não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar o endereço" });
  }
}
