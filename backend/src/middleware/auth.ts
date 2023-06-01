import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: { email: string };
}

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("OPA CHEGOU ALGO", token);

  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.email) {
      req.userId = { email: decoded.email };
      next();
    } else {
      throw new Error("Token inválido");
    }
  } catch (error) {
    return res.status(401).json({ error: "Não autorizado" });
  }
}
