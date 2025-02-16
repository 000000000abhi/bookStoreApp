import express from "express";
import { 
    getAllBlogs, 
    getBlogById, 
    getBlogsByAuthor, 
    createBlog, 
    updateBlogById, 
    deleteBlogById 
} from "../controller/blog.controller.js";

const router = express.Router();

// Route to fetch all blogs
router.get("/", getAllBlogs);

// Route to fetch a single blog by ID
router.get("/:id", getBlogById);

// Route to fetch blogs by author
router.get("/author/:authorId", getBlogsByAuthor);

// Route to create a new blog
router.post("/", createBlog);

// Route to update a blog by ID
router.put("/:id", updateBlogById);

// Route to delete a blog by ID
router.delete("/:id", deleteBlogById);

export default router;
