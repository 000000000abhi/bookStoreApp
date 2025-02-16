import express from "express";
import { getAllBooks, getBookById, searchBooksByName, getBookByIsbn } from "../controller/book.controller.js";

const router = express.Router();

// Route to fetch all books
router.get("/", getAllBooks);

// Route to fetch a single book by ID
router.get("/:id", getBookById); // Correctly handle route for book by ID

// Route to fetch a single book by ISBN
router.get("/isbn/:isbn", getBookByIsbn); // Correctly handle route for book by ISBN
// Route to search books by name
router.get("/search/:name", searchBooksByName);

export default router;
