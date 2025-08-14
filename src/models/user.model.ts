import prisma from "../config/prisma";
import { User } from "@prisma/client";

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export const UserModel = {
  // Buscar usuário por ID
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  // Criar usuário
  async createUser(data: IUserInput): Promise<User> {
    return prisma.user.create({ data });
  },
};
