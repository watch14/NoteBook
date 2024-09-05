import express from "express";
import {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
} from "../controllers/page.constroller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management APIs
 */

router.post("/create", createPage);

router.get("/get/:id", getPageById);

router.get("/get/all", getAllPages);

router.put("/update/:id", updatePage);

router.delete("/delete/:id", deletePage);

export default router;
