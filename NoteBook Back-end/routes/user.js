import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// register api
router.post("/register", registerUser);

// login api
router.post("/login", loginUser);

// all user api
router.get("/all", getAllUsers);

export default router;
