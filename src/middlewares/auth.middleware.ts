import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

interface JwtPayload {
  userId: string;
  email: string;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  if (typeof authHeader !== "string") {
    return res.status(400).json({ error: "Formato de header inválido" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  const token = tokenParts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log("Token válido, payload do usuário:", payload);
    (req as any).user = payload;
    next();
  } catch (err: any) {
    console.error("Token inválido ou expirado:", err.message);
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
