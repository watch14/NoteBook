import express from "express";
import {
  createNotebook,
  deleteNotebook,
  getAllNotebooks,
  getNotebookById,
  getUserNotebooks,
  updateNotebook,
} from "../controllers/notebook.controller.js";
import { verifyToken } from "../utils/auth.js";
import { getUserById } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notebooks
 *   description: Notebook management APIs
 */

/**
 * @swagger
 * /notebooks/create:
 *   post:
 *     summary: Create a new notebook
 *     tags: [Notebooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Notebook
 *               userId:
 *                 type: string
 *                 example: 60d21ba9d8d1b80d8c7f11d6
 *     responses:
 *       200:
 *         description: Notebook created successfully
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
 *                   example: Notebook created successfully!
 *                 data:
 *                   $ref: '#/components/schemas/Notebook'
 *       400:
 *         description: Bad request, title and userId are required
 *       500:
 *         description: Internal server error
 */
router.post("/create", createNotebook);

/**
 * @swagger
 * /notebooks/get/{id}:
 *   get:
 *     summary: Get a notebook by ID
 *     tags: [Notebooks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the notebook to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notebook fetched successfully
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
 *                   example: Notebook fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Notebook'
 *       404:
 *         description: Notebook not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", getNotebookById);

/**
 * @swagger
 * /notebooks/all:
 *   get:
 *     summary: Get all notebooks
 *     tags: [Notebooks]
 *     responses:
 *       200:
 *         description: All notebooks fetched successfully
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
 *                   example: All notebooks fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notebook'
 *       500:
 *         description: Internal server error
 */
router.get("/all", getAllNotebooks);

/**
 * @swagger
 * /notebooks/update/{id}:
 *   put:
 *     summary: Update a notebook by ID
 *     tags: [Notebooks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the notebook to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Notebook Title
 *               userId:
 *                 type: string
 *                 example: 60d21ba9d8d1b80d8c7f11d6
 *     responses:
 *       200:
 *         description: Notebook updated successfully
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
 *                   example: Notebook updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Notebook'
 *       404:
 *         description: Notebook not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", updateNotebook);

/**
 * @swagger
 * /notebooks/delete/{id}:
 *   delete:
 *     summary: Delete a notebook by ID
 *     tags: [Notebooks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the notebook to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notebook deleted successfully
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
 *                   example: Notebook deleted successfully
 *       404:
 *         description: Notebook not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", deleteNotebook);

/**
 * @swagger
 * /notebooks/user/{id}:
 *   get:
 *     summary: Get notebooks for a specific user by their ID
 *     tags: [Notebooks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user whose notebooks are to be fetched
 *         schema:
 *           type: string
 *           example: "60a770df03475b25c0b8c5ff"
 *     responses:
 *       200:
 *         description: List of notebooks retrieved successfully
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
 *                   example: "Notebooks fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60a770df03475b25c0b8c5ff"
 *                       title:
 *                         type: string
 *                         example: "My First Notebook"
 *                       content:
 *                         type: string
 *                         example: "This is the content of the notebook"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-07T12:34:56.789Z"
 *       404:
 *         description: No notebooks found for the given user
 *       500:
 *         description: Internal server error
 */
router.get("/user/:id", getUserNotebooks);

/**
 * @swagger
 * components:
 *   schemas:
 *     Notebook:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d21ba9d8d1b80d8c7f11d6
 *         title:
 *           type: string
 *           example: My Notebook
 *         userId:
 *           type: string
 *           example: 60d21ba9d8d1b80d8c7f11d6
 */

export default router;
