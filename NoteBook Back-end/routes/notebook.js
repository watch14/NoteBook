import express from "express";
import {
  createNotebook,
  deleteNotebook,
  getAllNotebooks,
  getNotebookById,
  updateNotebook,
} from "../controllers/notebook.controller.js";

const router = express.Router();

router.post("/create", createNotebook);

router.get("/get/:id", getNotebookById);

router.get("/all", getAllNotebooks);

router.put("/update/:id", updateNotebook);

router.delete("/delete/:id", deleteNotebook);

export default router;
