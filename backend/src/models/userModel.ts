import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../db"; // Importe o arquivo de configuração do banco de dados
import bcrypt from "bcrypt";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

class UserModel {
  static async create(
    name: string,
    email: string,
    password: string
  ): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      return result.insertId || 0; // Retorna o ID do usuário inserido ou 0 se não estiver disponível
    } catch (error) {
      throw new Error("Erro criando o usuario");
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length > 0) {
        const user: any = {
          id: rows[0].id,
          name: rows[0].name,
          email: rows[0].email,
          password: rows[0].password,
        };

        return user; // Retorna o usuário encontrado
      }

      return null; // Retorna null se nenhum usuário for encontrado
    } catch (error) {
      throw new Error("Erro tentando encontrar usuario pelo email");
    }
  }

  static async getAllUsers(): Promise<User | null> {
    try {
      const [user] = await db.query<any>("SELECT * FROM users");

      return user; // Retorna o usuário encontrado
    } catch (error) {
      throw new Error("Erro tentando encontrar usuario pelo email");
    }
  }

  static async deleteUser(id: any): Promise<User | null> {
    try {
      const [user] = await db.query<any>("DELETE FROM users WHERE id = ?", [
        id,
      ]);

      return user; // Retorna o usuário encontrado
    } catch (error) {
      throw new Error("Erro tentando encontrar usuario pelo email");
    }
  }

  static async findByID(id: string): Promise<User | null> {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      if (rows.length > 0) {
        const user: any = {
          id: rows[0].id,
          name: rows[0].name,
          email: rows[0].email,
          password: rows[0].password,
        };

        return user;
      }

      return null;
    } catch (error) {
      throw new Error("Error finding user by ID");
    }
  }

  static async updateByID(
    id: string,
    userData: Partial<User>
  ): Promise<User | null> {
    try {
      const allowedFields = ["name", "email", "password"];
      const validFields: Partial<User> = {};

      for (const field in userData) {
        if (allowedFields.includes(field)) {
          validFields[field] = userData[field];
        }
      }

      if (Object.keys(validFields).length === 0) {
        return null; // Retorna null se nenhum campo válido for fornecido
      }

      await db.query("UPDATE users SET ? WHERE id = ?", [validFields, id]);

      const updatedUser = await this.findByID(id);
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }
}

export default UserModel;
