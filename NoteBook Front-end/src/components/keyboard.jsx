import { useState, useEffect } from "react";
import { MAP_HIRA, MAP_KATA } from "../utils/maps";
import { translateText } from "../utils/api";
import { PuffLoader, BounceLoader } from "react-spinners";
import "../css/keyboard.css";

// Function to escape special characters in regex
const escapeRegExp = (string) => {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Convert Romaji to Kana based on the case
function convertRomajiToKana(input, type) {
  const map = type === "hira" ? MAP_HIRA : MAP_KATA;
  let val = "";
  let tempInput = input;

  while (tempInput.length > 0) {
    const char = tempInput[0];
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
    const mapToUse = isUpper ? MAP_KATA : MAP_HIRA;

    let matched = false;
    for (const [romaji, kana] of mapToUse.sort(
      ([a], [b]) => b.length - a.length
    )) {
      const escapedRomaji = escapeRegExp(romaji);
      const regex = new RegExp(`^${escapedRomaji}`, "i");

      if (regex.test(tempInput)) {
        val += kana;
        tempInput = tempInput.substring(romaji.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      val += char;
      tempInput = tempInput.substring(1);
    }
  }

  return val;
}

export default function Keyboard() {
  const [kanaInput, setKanaInput] = useState("");
  const [kanjiInput, setKanjiInput] = useState("");
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [kanjiSuggestions, setKanjiSuggestions] = useState([]);
  const [translation, setTranslation] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [katakana, setKatakana] = useState("");
  const [romaji, setRomaji] = useState("");
  const [translationError, setTranslationError] = useState("");
  const [showTranslation, setShowTranslation] = useState(true);
  const [loading, setLoading] = useState(false); // Overall loading state
  const [kanjiLoading, setKanjiLoading] = useState(false); // Separate loading state for Kanji

  useEffect(() => {
    setKanaInput(sessionStorage.getItem("kanaString") || "");
    setKanjiInput(sessionStorage.getItem("kanjiInputString") || "");
    setShowDefinitions(sessionStorage.getItem("defchecked") === "true");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("kanaString", kanaInput);
  }, [kanaInput]);

  useEffect(() => {
    sessionStorage.setItem("kanjiInputString", kanjiInput);
  }, [kanjiInput]);

  useEffect(() => {
    sessionStorage.setItem("defchecked", showDefinitions ? "true" : "false");
  }, [showDefinitions]);

  const handleKanaChange = (e) => {
    const value = e.target.value;
    setKanaInput(
      convertRomajiToKana(
        value,
        value === value.toUpperCase() ? "kata" : "hira"
      )
    );
  };

  const handleKanjiChange = (e) => {
    const value = e.target.value;
    setKanjiInput(
      convertRomajiToKana(
        value,
        value === value.toUpperCase() ? "kata" : "hira"
      )
    );
  };

  const fetchKanjiSuggestionsData = async () => {
    if (kanjiInput.trim().length > 0) {
      setKanjiLoading(true); // Start Kanji loading
      try {
        const response = await fetch(
          "http://localhost:5000/api/translate/kanji",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: kanjiInput }),
          }
        );
        const data = await response.json();
        if (data.data) {
          setKanjiSuggestions(data.data);
        }
      } catch (error) {
        console.error("Error fetching Kanji suggestions:", error.message);
      } finally {
        setKanjiLoading(false); // End Kanji loading
      }
    }
  };

  const handleKanjiClick = (kanji) => {
    setKanaInput((prev) => prev + kanji);
    setKanjiInput((prev) => prev + kanji);
    navigator.clipboard.writeText(kanji);
    setKanjiSuggestions([]);
  };

  const handleTranslate = async () => {
    try {
      if (!kanaInput) {
        throw new Error("No Kana input to translate.");
      }
      setLoading(true); // Start loading for translation
      const result = await translateText(kanaInput);

      if (
        result &&
        result.hiragana &&
        result.katakana &&
        result.romaji &&
        result.translation
      ) {
        setHiragana(result.hiragana);
        setKatakana(result.katakana);
        setRomaji(result.romaji);
        setTranslation(result.translation);
        setTranslationError(""); // Clear any previous errors
      } else {
        throw new Error("Translation response is missing data.");
      }
    } catch (error) {
      setTranslationError(`Error translating text: ${error.message}`);
      console.error("Error translating text:", error.message);
    } finally {
      setLoading(false); // End loading for translation
    }
  };

  return (
    <div className="k-cont">
      {(loading || kanjiLoading) && (
        <div className="loader">
          <BounceLoader color="#E60012" size={100} />
        </div>
      )}
      <div className="k-title-bg">
        <h1 className="k-title">Japanese Keyboard</h1>
      </div>
      <div className="t-instruction">
        <p>
          Type in English letters, and we'll convert them into Japanese
          characters (Hiragana or Katakana).
        </p>
        <p>
          ▬ <strong>lowercase</strong> Hiragana: "<strong>ひらがな</strong>" ▬{" "}
          <strong>UPPERCASE</strong>
          Katakana: "<strong>カタカナ</strong>" ▬
        </p>
      </div>
      <div className="t-main">
        <div className="t-tra">
          <textarea
            className="text-1"
            value={kanaInput}
            onChange={handleKanaChange}
            placeholder="Type Romaji here (Hiragana and Katakana)"
          />
          <div className="t-butt">
            {translation && (
              <label
                className="t-show-tra"
                onClick={() => setShowTranslation((prev) => !prev)}
              >
                {showTranslation ? "Hide Translation" : "Show Translation"}
              </label>
            )}
            <button onClick={handleTranslate}>Translate</button>
          </div>

          {loading ? (
            <div className="loader-overlay">
              <PuffLoader color="#E60012" size={100} />
            </div>
          ) : (
            showTranslation &&
            translation && (
              <div className="t-resault">
                <h2>Translation Result</h2>

                {Object.entries({
                  translation,
                  romaji,
                  hiragana,
                  katakana,
                }).map(([key, value]) => (
                  <div className="res-block" key={key}>
                    <p>{value}</p>
                    <p className="res-right">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            )
          )}

          {translationError && (
            <p style={{ color: "red" }}>{translationError}</p>
          )}
        </div>

        <div className="t-kan">
          <textarea
            className="text-2"
            value={kanjiInput}
            onChange={handleKanjiChange}
            placeholder="Type Romaji here (Hiragana and Katakana)"
          />
          <div className="t-translate-k">
            {kanjiSuggestions.length > 0 && (
              <label>
                <input
                  type="checkbox"
                  checked={showDefinitions}
                  onChange={() => setShowDefinitions((prev) => !prev)}
                />
                Definitions
              </label>
            )}
            <button onClick={fetchKanjiSuggestionsData}>Get Kanji</button>
          </div>

          {kanjiLoading && (
            <div className="loader-overlay">
              <PuffLoader color="#E60012" size={100} />
            </div>
          )}

          {kanjiSuggestions.length > 0 && <h2>Kanji Result</h2>}

          <div className="t-kanji-cont">
            {kanjiSuggestions.map((entry, index) => (
              <div className="t-kanji" key={index}>
                <button onClick={() => handleKanjiClick(entry.kanji)}>
                  {entry.kanji}
                </button>
                {showDefinitions && (
                  <div>
                    <p>{entry.definition}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
