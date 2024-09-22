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

async function testProxy(proxyUrl) {
  try {
    const agent = new HttpsProxyAgent(proxyUrl);
    const response = await fetch("https://www.google.com", { agent });
    return response.ok;
  } catch (error) {
    console.error(`Proxy test failed: ${error.message}`);
    return false;
  }
}

async function fetchWithBackoff(fetchFunction, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchFunction();
    } catch (err) {
      if (err.message.includes("Too Many Requests")) {
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
        console.warn(`Rate limit reached. Retrying in ${waitTime} ms...`);
        await delay(waitTime);
      } else {
        throw err; // Rethrow other errors
      }
    }
  }
  throw new Error("Max retries reached");
}

export async function convertAndTranslate(text) {
  await initKuroshiro();

  const resultHiragana = await kuroshiro.convert(text, { to: "hiragana" });
  const resultKatakana = await kuroshiro.convert(text, { to: "katakana" });
  const resultRomaji = await kuroshiro.convert(text, {
    to: "romaji",
    mode: "spaced",
  });

  const proxyUrl = "http://178.62.202.227:7497"; // A proxy from your list
  const isProxyValid = await testProxy(proxyUrl);

  if (!isProxyValid) {
    console.error("Invalid proxy, falling back to direct connection.");
    return;
  }

  try {
    const agent = new HttpsProxyAgent(proxyUrl);

    const { text: translatedText } = await fetchWithBackoff(() =>
      translate.translate(text, {
        from: "ja",
        to: "en",
        // fetchOptions: { agent },
      })
    );

    return {
      hiragana: resultHiragana,
      katakana: resultKatakana,
      romaji: resultRomaji,
      translation: translatedText,
    };
  } catch (err) {
    if (err.message.includes("Too Many Requests")) {
      console.warn("Rate limit reached. Please try again later.");
      return {
        hiragana: resultHiragana,
        katakana: resultKatakana,
        romaji: resultRomaji,
        translation: "Translation unavailable at this time.",
      };
    } else {
      console.error("Translation error:", err);
      throw err;
    }
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
