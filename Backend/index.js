import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js"; // Import the book routes
import userRoute from "./route/user.route.js"; // Import the user routes
import blogRoute from "./route/blog.route.js";
import adminRoute from "./route/admin.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with improved error handling
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// Define routes
app.use("/book", bookRoute);  // All routes for books
app.use("/user", userRoute);  // All routes for user
app.use("/blog",blogRoute);
app.use("/admin", adminRoute);
// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
