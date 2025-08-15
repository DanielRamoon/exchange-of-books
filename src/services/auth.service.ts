import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export async function login(email: string, password: string) {
  const user = await UserModel.findByEmail(email);

  if (!user) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Senha inválida");

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    message: "Login realizado com sucesso",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

export async function register(name: string, email: string, password: string) {
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) throw new Error("Email já cadastrado");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    message: "Usuário registrado com sucesso",
    user: { id: user.id, name: user.name, email: user.email },
  };
}
