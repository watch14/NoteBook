import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import { convertAndTranslate } from "../utils/translateEng.js";

// Translate
export const translate = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return next(CreateError(400, "text is required!"));
    }

    const result = await convertAndTranslate(text);

    return next(CreateSuccess(200, "Translation successful!", result));
  } catch (err) {
    return next(CreateError(500, "Internal server error for translating!"));
  }
};
