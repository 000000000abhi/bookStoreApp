import Book from "../model/book.model.js";

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ISBN
export const getBookByIsbn = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search books by name
export const searchBooksByName = async (req, res) => {
  try {
    const books = await Book.find({ name: { $regex: req.params.name, $options: "i" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
