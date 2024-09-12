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
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Filter notebooks by title (case-insensitive)
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of notebooks to return (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: skip
 *         in: query
 *         description: Number of notebooks to skip (for pagination, default is 0)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: sortBy
 *         in: query
 *         description: Field to sort the results by (e.g., createdAt or updatedAt). Default is createdAt.
 *         required: false
 *         schema:
 *           type: string
 *           example: createdAt
 *       - name: sortOrder
 *         in: query
 *         description: Sort order, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           example: asc
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
 *     summary: Get notebooks for a specific user
 *     tags: [Notebooks]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user whose notebooks are to be fetched
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1e8d001f6475f3
 *       - name: title
 *         in: query
 *         description: Filter notebooks by title (case-insensitive)
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of notebooks to return (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: skip
 *         in: query
 *         description: Number of notebooks to skip (for pagination, default is 0)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: sortBy
 *         in: query
 *         description: Field to sort the results by (e.g., createdAt or updatedAt). Default is createdAt.
 *         required: false
 *         schema:
 *           type: string
 *           example: createdAt
 *       - name: sortOrder
 *         in: query
 *         description: Sort order, either 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           example: asc
 *     responses:
 *       200:
 *         description: Notebooks fetched successfully
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
 *                   example: Notebooks fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notebook'
 *       404:
 *         description: No notebooks found for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: This user has no notebooks!
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
