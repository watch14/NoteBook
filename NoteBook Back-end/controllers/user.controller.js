import User from "../models/User.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();

    return next(CreateSuccess(200, "User created successfully!", newUser));
  } catch (err) {
    return next(
      CreateError(500, "Internal server error for creating a user!", err)
    );
  }
};

// res.cookie("access_token", token, { httpOnly: true }).status(200).json({
//   status: 200,
//   message: "login Success!",
//   data: user,
//   token: token,
// });

// Login user
export const loginUser = async (req, res, next) => {
  console.log("Request:", req.method, req.originalUrl, req.body);

  try {
    const { userName, password } = req.body;

    // Ensure both username and password are provided
    if (!userName || !password) {
      return next(CreateError(400, "Username and password are required"));
    }

    // Find user by userName (updated to match your document field)
    const user = await User.findOne({ userName });
    if (!user) {
      return next(
        CreateError(404, "User not found with the provided username")
      );
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return next(CreateError(400, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const userData = {
      user,
      token,
    };

    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Login error:", err); // Log error for debugging
    return next(
      CreateError(500, "Internal server error during user login", err)
    );
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return next(CreateSuccess(200, "All users fetched successfully", users));
  } catch (err) {
    return next(
      CreateError(500, "Internal server error for fetching all users", err)
    );
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(CreateError(404, "User not found"));
    }
    return next(CreateSuccess(200, "User fetched successfully", user));
  } catch (err) {
    return next(
      CreateError(500, "Internal server error for fetching a user", err)
    );
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(CreateError(404, "User Not Found!"));
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    return next(CreateSuccess(200, "User Updated!", userData));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for Updating a User!", err)
    );
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(CreateError(404, "User Not Found!"));
    }
    await User.findByIdAndDelete(userId);
    return next(CreateSuccess(200, "User Deleted!", user));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for Deleting a User!", err)
    );
  }
};
