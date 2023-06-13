import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface estendida para adicionar a propriedade user
interface AuthenticatedRequest extends Request {
  user?: any; // Defina o tipo apropriado para o objeto user
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Armazena as informações do usuário decodificadas no objeto req.user
    req.user = decoded;
    next();
  });
}
