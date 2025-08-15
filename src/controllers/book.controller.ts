import { Request, Response } from "express";
import * as bookService from "../services/book.service";

export async function createBook(req: Request, res: Response) {
  try {
    const { title, author, description } = req.body;
    const ownerId = (req as any).user?.userId || (req as any).user?.id;

    if (!title || !author) {
      console.warn("Falha na validação: title ou author ausentes");
      return res
        .status(400)
        .json({ message: "Title and author are required." });
    }

    if (!ownerId) {
      console.error("Erro: ownerId não encontrado no req.user");
      return res
        .status(400)
        .json({ message: "Usuário não autenticado corretamente." });
    }

    const newBook = await bookService.createBook(
      { title, author, description },
      ownerId
    );

    console.log("Livro criado com sucesso:", newBook);
    res.status(201).json(newBook);
  } catch (error: any) {
    console.error("Erro ao criar livro:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

export async function getBooks(req: Request, res: Response) {
  try {
    const books = await bookService.getBooks();
    return res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBookById(req: Request, res: Response) {
  try {
    const bookId = req.params.id;
    const book = await bookService.getBookById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function reserveBook(req: Request, res: Response) {
  try {
    const bookId = req.params.id;
    const userId = (req as any).user.userId;

    const reservedBook = await bookService.reserveBook(bookId, userId);
    return res.status(200).json(reservedBook);
  } catch (error: any) {
    if (error.message === "Livro não encontrado") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Livro já está reservado") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function cancelReservation(req: Request, res: Response) {
  try {
    const bookId = req.params.id;

    await bookService.cancelReservation(bookId);
    return res
      .status(200)
      .json({ message: "Reservation cancelled successfully." });
  } catch (error: any) {
    if (error.message === "Livro não encontrado") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Livro não está reservado") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}
