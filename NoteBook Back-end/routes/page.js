import express from "express";
import {
  createPage,
  deletePage,
  getAllPages,
  getPageById,
  getPagesByNotebookId,
  updatePage,
} from "../controllers/page.constroller.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management APIs
 */

/**
 * @swagger
 * /pages/create:
 *   post:
 *     summary: Create a new page
 *     tags: [Pages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notebookId:
 *                 type: string
 *                 example: 60d21ba9d8d1b80d8c7f11d6
 *               text:
 *                 type: string
 *                 example: This is the page text
 *               sketch:
 *                 type: string
 *                 example: Some sketch data
 *     responses:
 *       200:
 *         description: Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Page created successfully!
 *                 data:
 *                   $ref: '#/components/schemas/Page'
 *       404:
 *         description: Notebook not found
 *       500:
 *         description: Internal server error
 */
router.post("/create", verifyToken, createPage);

/**
 * @swagger
 * /pages/get/{id}:
 *   get:
 *     summary: Get a page by ID
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the page to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Page fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Page'
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", verifyToken, getPageById);

/**
 * @swagger
 * /pages/all:
 *   get:
 *     summary: Get all pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: All pages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: All pages fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Page'
 *       500:
 *         description: Internal server error
 */
router.get("/all", verifyToken, getAllPages);

/**
 * @swagger
 * /pages/update/{id}:
 *   put:
 *     summary: Update a page by ID
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the page to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: Updated page text
 *               sketch:
 *                 type: string
 *                 example: Updated sketch data
 *               notebookId:
 *                 type: string
 *                 example: 60d21ba9d8d1b80d8c7f11d6
 *     responses:
 *       200:
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Page updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Page'
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", verifyToken, updatePage);

/**
 * @swagger
 * /pages/delete/{id}:
 *   delete:
 *     summary: Delete a page by ID
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the page to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Page deleted successfully
 *       404:
 *         description: Page not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", verifyToken, deletePage);

/**
 * @swagger
 * /pages/notebook/{id}:
 *   get:
 *     summary: Get pages by notebook ID
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the notebook to fetch pages for
 *         schema:
 *           type: string
 *           example: "60a770df03475b25c0b8c5ff"
 *     responses:
 *       200:
 *         description: Pages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Pages fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "612c7b8a1f09e8d5bcff87a2"
 *                       title:
 *                         type: string
 *                         example: "Page 1"
 *                       content:
 *                         type: string
 *                         example: "This is the content of the first page."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-07T12:34:56.789Z"
 *       404:
 *         description: Pages not found for the specified notebook ID
 *       500:
 *         description: Internal server error
 */
router.get("/notebook/:id", verifyToken, getPagesByNotebookId);

/**
 * @swagger
 * components:
 *   schemas:
 *     Page:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d21ba9d8d1b80d8c7f11d6
 *         text:
 *           type: string
 *           example: This is the page text
 *         sketch:
 *           type: string
 *           example: Some sketch data
 *         notebookId:
 *           type: string
 *           example: 60d21ba9d8d1b80d8c7f11d6
 */

export default router;
