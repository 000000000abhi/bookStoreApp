
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: { type: String, required: true }, // Author or Book Name
  image: { type: String, required: true }, // URL to the book image
  introduction: { type: String, required: true }, // Brief introduction about the book
  title: { type: String, required: true }, // Full title of the book
  category: { type: String, required: true }, // Category of the book (e.g., Fiction, Non-Fiction)
  price: { type: Number, required: true }, // Price of the book
  isbn: { type: String, required: true }, // ISBN number
  publisher: { type: String, required: true }, // Publisher name
  printingDate: { type: Date, required: true }, // Printing date
  description: { type: String, required: true }, // Detailed description of the book
});

// Create the Book model using the updated schema
const Book = mongoose.model("Book", bookSchema);

export default Book;
