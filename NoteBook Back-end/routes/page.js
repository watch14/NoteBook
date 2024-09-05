import express from "express";
import {
  createPage,
  deletePage,
  getAllPages,
  getPageById,
  updatePage,
} from "../controllers/page.constroller.js";

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
router.post("/create", createPage);

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
router.get("/get/:id", getPageById);

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
router.get("/all", getAllPages);

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
router.put("/update/:id", updatePage);

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
router.delete("/delete/:id", deletePage);

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
