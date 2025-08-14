import { Request, Response } from "express";
import * as authService from "../services/auth.service";

/**
 * LOGIN - Autentica um usuário existente
 */
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validação simples
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Chama o service
    const result = await authService.login(email, password);

    return res.json(result);
  } catch (error: any) {
    // Retorna erro genérico
    return res.status(400).json({ error: error.message });
  }
}

/**
 * REGISTER - Cria um novo usuário
 */
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Nome, email e senha são obrigatórios" });
    }

    // Chama o service
    const result = await authService.register(name, email, password);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
