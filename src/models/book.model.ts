import prisma from "../config/prisma";

export interface IBookInput {
  title: string;
  author: string;
  description?: string;
}

export const BookModel = {
  async create(data: IBookInput & { ownerId: string }) {
    return prisma.book.create({
      data: {
        ...data,
        status: "available",
      },
    });
  },

  // Listar todos os livros
  async findAll() {
    return prisma.book.findMany();
  },

  // Buscar por ID
  async findById(id: string) {
    return prisma.book.findUnique({ where: { id } });
  },

  // Atualizar (ex: reservar)
  async update(
    id: string,
    data: Partial<IBookInput> & { reservedBy?: string }
  ) {
    return prisma.book.update({
      where: { id },
      data,
    });
  },
};
