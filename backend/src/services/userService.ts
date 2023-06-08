import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

class UserService {
  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<number> {
    try {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        throw new Error("Email já utilizado!");
      }
      const userId = await UserModel.create(name, email, password);
      return userId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async loginUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await UserModel.findByEmail(email);

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const { password, ...filteredUser } = user;
          return filteredUser;
        } else {
          throw new Error("Email ou senha inválida");
        }
      } else {
        throw new Error("Email ou senha inválida");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<User | null> {
    try {
      const user = await UserModel.findByID(id);

      if (user) {
        const updatedUser = await UserModel.updateByID(id, userData);
        return updatedUser;
      }

      return null;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }
}

export default UserService;
