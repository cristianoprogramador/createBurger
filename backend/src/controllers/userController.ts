import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userId = await UserService.createUser(name, email, password);
      res.status(201).json({ userId });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.loginUser(email, password);

      if (user) {
        // Aqui você pode gerar e retornar o token JWT para autenticação
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: "Email ou senha inválida" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    try {
      const updatedUser = await UserService.updateUser(id, userData);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  }
}

export default UserController;
