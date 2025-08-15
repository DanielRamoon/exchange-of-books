import { Router } from "express";
import * as bookController from "../controllers/book.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Criar livro (autenticado)
router.post("/", authenticateToken, bookController.createBook);

// Listar todos os livros
router.get("/", bookController.getBooks);

// Detalhes de um livro
router.get("/:id", bookController.getBookById);

// Reservar um livro (autenticado)
router.post("/:id/reserve", authenticateToken, bookController.reserveBook);

// Cancelar reserva (autenticado)
router.post("/:id/cancel", authenticateToken, bookController.cancelReservation);

// Atualizar um livro (somente dono do livro)
router.put("/:id", authenticateToken, bookController.updateBook);

// falta criar as roras de:
//  Atualizar um livro
//  Deletar um livro (autenticado)
// Listar livros reservados por um usuário
// Pesquisar livros
// listar livro reservados por um usuário (autenticado)
// Listar livros por status (disponível, reservado, etc.)
export default router;
