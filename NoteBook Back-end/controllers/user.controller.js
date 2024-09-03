import User from "../models/User.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import bcrypt from "bcryptjs";

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

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(CreateError(404, "User not found"));
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Wrong password or username"));
    }

    return next(CreateSuccess(200, "User logged in successfully", user));
  } catch (err) {
    return next(
      CreateError(500, "Internal server error for logging in a user", err)
    );
  }
};

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
