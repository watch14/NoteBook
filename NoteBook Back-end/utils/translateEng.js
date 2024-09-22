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
// translate
export async function convertAndTranslate(text, targetLanguages) {
  await initKuroshiro(); // Ensure Kuroshiro is initialized

  // Convert Japanese text to Hiragana, Katakana, and Romaji
  const resultHiragana = await kuroshiro.convert(text, { to: "hiragana" });
  const resultKatakana = await kuroshiro.convert(text, { to: "katakana" });
  const resultRomaji = await kuroshiro.convert(text, {
    to: "romaji",
    mode: "spaced",
  });

  // Object to store translations in different languages
  const translations = {};

  // Loop through each target language and translate
  for (const lang of targetLanguages) {
    try {
      const { text: translatedText } = await translate.translate(text, {
        from: "ja",
        to: lang,
      });
      translations[lang] = translatedText; // Store the translation with the language key
    } catch (err) {
      console.error(`Translation error for ${lang}:`, err);
      translations[lang] = `Error translating to ${lang}`; // Handle error gracefully
    }
  }

  return {
    hiragana: resultHiragana,
    katakana: resultKatakana,
    romaji: resultRomaji,
    translations, // Return all translations in an object
  };
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
