import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// Signup function
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// admin signup 
export const signupAdmin = async (req, res) => {
  try {
    const { fullname, email, password, adminKey } = req.body;

    // Verify admin key (Replace 'SECRET_ADMIN_KEY' with a secure env variable)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin key" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new User({
      fullname,
      email,
      password: hashedPassword,
      role: "admin", // Ensure role-based access control
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin account created successfully",
      user: {
        _id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        coins: user.coins,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search by email function
export const searchByEmail = async (req, res) => {
    try {
      const { email } = req.params; // Get email from route parameters
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      console.log(`Searching for user with email: ${email}`);
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({
        message: "User found",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          coins: user.coins,
          orders: user.orders,
          coupons: user.coupons,
          giftCards: user.giftCards,
        },
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Function to update user coins
export const updateUserCoins = async (req, res) => {
  try {
    const { email, coins } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.coins += coins;
    await user.save();
    res.status(200).json({
      message: "User coins updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        coins: user.coins,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to add a coupon
export const addCoupon = async (req, res) => {
  try {
    const { email, couponCode, discount } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.coupons.push({ couponCode, discount });
    await user.save();
    res.status(200).json({
      message: "Coupon added successfully",
      coupons: user.coupons,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to add a gift card
export const addGiftCard = async (req, res) => {
  try {
    const { email, cardNumber, balance } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.giftCards.push({ cardNumber, balance });
    await user.save();
    res.status(200).json({
      message: "Gift card added successfully",
      giftCards: user.giftCards,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update user details
export const updateUserDetails = async (req, res) => {
  try {
    const { email, fullname, address } = req.body; // Expecting email, fullname, and address to update
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fullname) user.fullname = fullname; // Update fullname if provided
    if (address) user.address = address; // Update address if provided
    await user.save();
    res.status(200).json({
      message: "User details updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords for security
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default {
  signup,
  login,
  searchByEmail,
  updateUserCoins,
  addCoupon,
  addGiftCard,
  updateUserDetails,
  getAllUsers, 
};
