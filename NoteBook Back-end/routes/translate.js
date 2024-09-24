import expresss from "express";
import {
  convertToKanji,
  translate,
} from "../controllers/trasnlate.controller.js";
import { verifyToken } from "../utils/auth.js";

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
 *     summary: Translate Japanese text to other formats and languages
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
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Target languages for translation (ISO 639-1 codes)
 *                   example: en
 *                   enum: [en, ar, es, fr, zh] # List of language codes (add as many as needed)
 *     responses:
 *       200:
 *         description: Translation successful
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
 *                   example: Translation successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     hiragana:
 *                       type: string
 *                       example: どこ つとめさき なに です か?
 *                     katakana:
 *                       type: string
 *                       example: ドコ ツトメサキ ナニ デス カ?
 *                     romaji:
 *                       type: string
 *                       example: doko tsutomesaki nani desu ka?
 *                     translations:
 *                       type: object
 *                       description: Translated texts based on the selected languages
 *                       additionalProperties:
 *                         type: string
 *                         example: Where is your workplace?
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
