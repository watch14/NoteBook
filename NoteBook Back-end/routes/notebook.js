import express from "express";
import { createNotebook } from "../controllers/notebook.controller.js";

const router = express.Router();

router.post("/create", createNotebook);

export default router;
