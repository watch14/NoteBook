import expresss from "express";
import { translate } from "../controllers/trasnlate.controller.js";

const router = expresss.Router();

/**
 * @swagger
 * tags:
 *   name: Translate
 *   description: Translate APIs
 */

/**
 * @swagger
 * /translate:
 *   post:
 *     summary: Translate text
 *     tags: [Translate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: add japanese text to trasnlate
 *     responses:
 *       200:
 *         description: Translate successful
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
 *                   example: Translate successful
 *                 data:
 *                   type: string
 *                   example: add japanese text to trasnlate
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", translate);

export default router;
