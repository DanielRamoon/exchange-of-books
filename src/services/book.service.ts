import prisma from "../config/prisma";

interface BookInput {
  title: string;
  author: string;
  description?: string;
}

// Criar novo livro
export async function createBook(data: BookInput, ownerId: string) {
  return prisma.book.create({
    data: {
      ...data,
      ownerId,
      status: "available",
    },
  });
}

// Listar todos os livros
export async function getBooks() {
  return prisma.book.findMany();
}

// Obter livro por ID
export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: { id },
  });
}

// Reservar livro
export async function reserveBook(bookId: string, userId: string) {
  // 1. Verificar se o livro existe
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new Error("Livro não encontrado");
  }

  // 2. Verificar se já está reservado
  if (book.reservedBy) {
    throw new Error("Livro já está reservado");
  }

  // 3. Atualizar livro com o ID do usuário que reservou
  return prisma.book.update({
    where: { id: bookId },
    data: {
      reservedBy: userId,
      status: "reserved",
    },
  });
}
// Cancelar reserva
export async function cancelReservation(bookId: string) {
  // 1. Verificar se o livro existe
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new Error("Livro não encontrado");
  }

  // 2. Verificar se está reservado
  if (!book.reservedBy) {
    throw new Error("Livro não está reservado");
  }

  // 3. Atualizar livro para remover reserva
  return prisma.book.update({
    where: { id: bookId },
    data: {
      reservedBy: null,
      status: "available",
    },
  });
}

export async function updateBook(
  bookId: string,
  data: Partial<BookInput>,
  ownerId: string
) {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new Error("Livro não encontrado");
  }

  // Atualizar os dados do livro
  return prisma.book.update({
    where: { id: bookId },
    data,
  });
}
