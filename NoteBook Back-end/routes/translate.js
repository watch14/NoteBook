import expresss from "express";
import {
  convertToKanji,
  translate,
} from "../controllers/trasnlate.controller.js";

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
 *                 example: どこ 勤め先 何 です か?
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

// convert to kanji router
/**
 * @swagger
 * /translate/kanji:
 *   post:
 *     summary: Convert text to kanji
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
 *                 example: どこ
 *     responses:
 *       200:
 *         description: Convert successful
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
 *                   example: Convert successful
 *                 data:
 *                   type: string
 *                   example: add japanese text to convert
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/kanji", convertToKanji);

export default router;
