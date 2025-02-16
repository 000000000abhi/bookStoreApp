import Admin from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Book from "../model/book.model.js";
import User from "../model/user.model.js";
dotenv.config();

// ✅ Admin Signup
export const signupAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if Admin Exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create New Admin
    const newAdmin = new Admin({ fullname, email, password });
    await newAdmin.save();

    res.status(201).json({
      message: "✅ Admin Created Successfully",
      admin: {
        _id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find Admin by Email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare Password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "✅ Admin Login Successful",
      admin: {
        _id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
  //all users
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //get all admins 
  export const getAllAdmins=async(req,res)=>{
    try{
        const admins=await Admin.find();
        res.json(admins);
    }catch (error) {
        res.status(500).json({ message: error.message });
  }
};