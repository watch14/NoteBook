import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import translate from "@vitalets/google-translate-api";

// Initialize Kuroshiro instance
const kuroshiro = new Kuroshiro();
let isInitialized = false;

async function initKuroshiro() {
  if (!isInitialized) {
    await kuroshiro.init(new KuromojiAnalyzer());
    isInitialized = true;
  }
}

export default async function convertAndTranslate(text) {
  await initKuroshiro(); // Ensure Kuroshiro is initialized

  // Convert Japanese text to Hiragana, Katakana, and Romaji
  const resultHiragana = await kuroshiro.convert(text, { to: "hiragana" });
  const resultKatakana = await kuroshiro.convert(text, { to: "katakana" });
  const resultRomaji = await kuroshiro.convert(text, {
    to: "romaji",
    mode: "spaced",
  });

  // Translate from Japanese to English
  try {
    const { text: translatedText } = await translate.translate(text, {
      from: "ja",
      to: "en",
    });
    return {
      hiragana: resultHiragana,
      katakana: resultKatakana,
      romaji: resultRomaji,
      translation: translatedText,
    };
  } catch (err) {
    console.error("Translation error:", err);
    throw err; // Re-throw error to handle it in the calling function
  }
}

export { convertAndTranslate };
