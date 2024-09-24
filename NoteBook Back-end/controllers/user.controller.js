import User from "../models/User.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    console.log(
      `[${new Date().toISOString()}] INFO: Attempting to register user: ${userName} with email: ${email}`
    );

    // Check if userName or email already exists
    const existingUserName = await User.findOne({ $or: [{ userName }] });

    if (existingUserName) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Username already exists: ${userName}`
      );
      return next(CreateError(400, "Username already exists"));
    }

    const existingUserEmail = await User.findOne({ $or: [{ email }] });
    if (existingUserEmail) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Email already exists: ${email}`
      );
      return next(CreateError(400, "Email already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();

    console.log(
      `[${new Date().toISOString()}] INFO: User registered successfully: ${userName} (ID: ${
        newUser._id
      })`
    );
    return next(CreateSuccess(200, "User created successfully!", newUser));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Error creating user: ${err.message}`
    );
    return next(
      CreateError(500, "Internal server error for creating a user!", err)
    );
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] INFO: Login request received for: ${
      req.body.userName
    }`
  );

  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Username/email and password are required`
      );
      return next(CreateError(400, "Username/email and password are required"));
    }

    const user = await User.findOne({
      $or: [{ userName }, { email: userName }],
    });

    if (!user) {
      console.log(
        `[${new Date().toISOString()}] ERROR: User not found with username/email: ${userName}`
      );
      return next(
        CreateError(404, "User not found with the provided username/email.")
      );
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Incorrect password for user: ${userName}`
      );
      return next(CreateError(400, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const userData = { userId: user._id, token };

    console.log(
      `[${new Date().toISOString()}] INFO: User logged in successfully: ${userName} (ID: ${
        user._id
      })`
    );
    return next(CreateSuccess(200, "User logged in successfully", userData));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Login error: ${err.message}`
    );
    return next(
      CreateError(500, "Internal server error during user login", err)
    );
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(
      `[${new Date().toISOString()}] INFO: Fetched all users. Count: ${
        users.length
      }`
    );
    return next(CreateSuccess(200, "All users fetched successfully", users));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Error fetching all users: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: User not found: ID ${userId}`
      );
      return next(CreateError(404, "User not found"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Fetched user by ID: ${userId}`
    );
    return next(CreateSuccess(200, "User fetched successfully", user));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Error fetching user by ID: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: User Not Found: ID ${userId}`
      );
      return next(CreateError(404, "User Not Found!"));
    }

    const updateData = req.body;

    if (updateData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(updateData.password, salt);
      updateData.password = hashedPassword;
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );
    console.log(
      `[${new Date().toISOString()}] INFO: User updated successfully: ${userId}`
    );
    return next(CreateSuccess(200, "User Updated!", userData));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Error updating user: ${err.message}`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: User Not Found: ID ${userId}`
      );
      return next(CreateError(404, "User Not Found!"));
    }

    await User.findByIdAndDelete(userId);
    console.log(
      `[${new Date().toISOString()}] INFO: User deleted successfully: ${userId}`
    );
    return next(CreateSuccess(200, "User Deleted!", user));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Error deleting user: ${err.message}`
    );
    return next(
      CreateError(500, "Internal Server Error for Deleting a User!", err)
    );
  }
};
