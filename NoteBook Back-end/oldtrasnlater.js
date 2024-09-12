import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();

await kuroshiro.init(new KuromojiAnalyzer());

const resultHiragana = await kuroshiro.convert("感じ取れたら手を繋ごう", {
  to: "hiragana",
});
const resultKatakana = await kuroshiro.convert("感じ取れたら手を繋ごう", {
  to: "katakana",
});
const resultRomaji = await kuroshiro.convert("感じ取れたら手を繋ごう", {
  to: "romaji",
  mode: "spaced",
});

console.log(resultHiragana);
console.log(resultKatakana);
console.log(resultRomaji);
