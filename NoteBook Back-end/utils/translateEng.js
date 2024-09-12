import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import translate from "@vitalets/google-translate-api";

const kuroshiro = new Kuroshiro();

async function convertAndTranslate(text) {
  await kuroshiro.init(new KuromojiAnalyzer());

  // Convert Japanese text to Hiragana, Katakana, and Romaji
  const resultHiragana = await kuroshiro.convert(text, { to: "hiragana" });
  const resultKatakana = await kuroshiro.convert(text, { to: "katakana" });
  const resultRomaji = await kuroshiro.convert(text, {
    to: "romaji",
    mode: "spaced",
  });

  console.log("Hiragana:", resultHiragana);
  console.log("Katakana:", resultKatakana);
  console.log("Romaji:", resultRomaji);

  // Translate from Japanese to English
  try {
    // Use translate.translate method
    const { text: translatedText } = await translate.translate(text, {
      from: "ja",
      to: "en",
    });
    console.log("Translation:", translatedText);
  } catch (err) {
    console.error("Translation error:", err);
  }
}

// Example Japanese text
const japaneseText = "感じ取れたら手を繋ごう";
convertAndTranslate(japaneseText);
