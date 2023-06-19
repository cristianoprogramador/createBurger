import { Request, Response } from "express";
import UserService from "../services/userService";
import jwt from "jsonwebtoken";
import UserModel, { User } from "../models/userModel";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userId = await UserService.deleteUser(id);
      res.status(201).json({ userId });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

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
        // Gera o token JWT com a informação do usuário
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ user, token });
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

  static async loginWithGoogle(req: Request, res: Response) {
    const { token } = req.body;

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const googleData = response.data;

      // console.log(googleData);

      // Verifique se o token de acesso do Google é válido e pertence ao seu aplicativo
      if (googleData.email_verified !== true) {
        return res.status(401).json({ error: "Token de acesso inválido" });
      }

      // Verifique se o usuário já está cadastrado no seu banco de dados com base no email
      let user: User | null = await UserModel.findByEmail(googleData.email);

      if (!user) {
        // Caso o usuário não esteja cadastrado, você pode criar um novo usuário com as informações do Google
        const createdUserId = await UserModel.create(
          googleData.name,
          googleData.email,
          ""
        );
        user = {
          id: createdUserId,
          name: googleData.name,
          email: googleData.email,
        };
      }

      // Gera o token JWT com a informação do usuário
      const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

      res.status(200).json({ user, token: jwtToken });
    } catch (error) {
      res.status(500).json({ error: "Erro ao autenticar com o Google" });
    }
  }

  static async loginAdmin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      // console.log(username, process.env.ADMIN_USER);
      // console.log(password, process.env.ADMIN_PASSWORD);
      if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign({ password }, process.env.JWTADMIN_SECRET);
        res.status(200).json({ message: "OK", token });
      } else {
        res.status(401).json({ message: "INVALIDO" });
      }
    } catch (error) {
      res.status(500).json({ error: "ERROR" });
    }
  }
}

export default UserController;
