import User from "../models/User.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email of the new user.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();
    return next(CreateSuccess(200, "User created successfully", newUser));
  } catch (err) {
    console.error("Error during user registration:");
    return next(CreateError(500, "Internal server error for creating a user"));
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
