import express from "express";
import { signupAdmin, adminLogin,getAllBooks,getBookByIsbn, getAllAdmins } from "../controller/admin.controller.js";
import { getAllUsers } from "../controller/user.controller.js";
const router = express.Router();

// Admin Signup Route
router.post("/signup", signupAdmin);

// Admin Login Route
router.post("/login", adminLogin);
router.post("/getAllBook",getAllBooks);
router.post("/getBookByIsbn",getBookByIsbn);

router.get("/getAllUser", getAllUsers);
router.get("/getAllAdmins",getAllAdmins);

export default router;
