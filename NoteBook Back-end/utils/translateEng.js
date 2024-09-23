import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import translate from "@vitalets/google-translate-api";
import { HttpsProxyAgent } from "https-proxy-agent";

const kuroshiro = new Kuroshiro();
let isInitialized = false;

async function initKuroshiro() {
  if (!isInitialized) {
    await kuroshiro.init(new KuromojiAnalyzer());
    isInitialized = true;
  }
}

export async function convertAndTranslate(text) {
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

// convert to kanji
export async function toKanji(text) {
  const api =
    "https://jisho.org/api/v1/search/words?keyword=" + encodeURIComponent(text);
  const response = await fetch(api);
  const data = await response.json();

  // Filter the results to return only those with a Kanji representation
  if (data.data && data.data.length > 0) {
    return data.data
      .filter((entry) => entry.japanese[0].word) // Only include results that have a Kanji word
      .map((entry) => ({
        kanji: entry.japanese[0].word || null, // Kanji word
        reading: entry.japanese[0].reading || null, // Kana reading
        definition: entry.senses[0].english_definitions.join(", ") || null, // English definition
      }));
  }

  return [];
}
