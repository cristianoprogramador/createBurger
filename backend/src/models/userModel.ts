import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../db"; // Importe o arquivo de configuração do banco de dados
import bcrypt from "bcrypt";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
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
      throw new Error("Error creating user");
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length > 0) {
        const user: User = {
          id: rows[0].id,
          name: rows[0].name,
          email: rows[0].email,
          password: rows[0].password,
        };

        return user; // Retorna o usuário encontrado
      }

      return null; // Retorna null se nenhum usuário for encontrado
    } catch (error) {
      throw new Error("Error finding user by email");
    }
  }
}

export default UserModel;
