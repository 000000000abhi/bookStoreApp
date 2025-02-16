import express from "express";
import {
  signup,
  signupAdmin,
  login,
  searchByEmail,
  updateUserCoins,
  addCoupon,
  addGiftCard,
  updateUserDetails,
} from "../controller/user.controller.js";

const router = express.Router();

// Route for user signup
router.post("/signup", signup);



// Route for user login
router.post("/login", login);

// Route for searching a user by email
router.get("/search/:email", searchByEmail);

// Route for updating user details
router.put("/update", updateUserDetails);

// Route for updating user coins
router.put("/update-coins", updateUserCoins);

// Route for adding a coupon
router.post("/add-coupon", addCoupon);

// Route for adding a gift card
router.post("/add-gift-card", addGiftCard);

export default router;
