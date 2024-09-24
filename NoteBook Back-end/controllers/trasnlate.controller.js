import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import { convertAndTranslate } from "../utils/translateEng.js";
import { toKanji } from "../utils/translateEng.js";

// Translate
export const translate = async (req, res, next) => {
  try {
    const { text, languages } = req.body; // Expecting languages as an array

    if (!text) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Text is required for translation.`
      );
      return next(CreateError(400, "text is required!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Translating text: "${text} `
    );

    const result = await convertAndTranslate(text, languages);

    console.log(
      `[${new Date().toISOString()}] INFO: Translation successful: "${result}"`
    );
    return next(CreateSuccess(200, "Translation successful!", result));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal server error for translating! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal server error for translating!"));
  }
};

// Convert to Kanji
export const convertToKanji = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Text is required for conversion to Kanji.`
      );
      return next(CreateError(400, "text is required!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Converting text to Kanji: "${text}"`
    );

    const result = await toKanji(text);

    console.log(
      `[${new Date().toISOString()}] INFO: Conversion to Kanji successful: "${result}"`
    );
    return next(CreateSuccess(200, "Conversion successful!", result));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal server error for converting to Kanji! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal server error for converting!"));
  }
};
