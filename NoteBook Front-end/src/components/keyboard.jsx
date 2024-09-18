import { useState, useEffect } from "react";
import { MAP_HIRA, MAP_KATA } from "../utils/maps";

// Function to escape special characters in regex
const escapeRegExp = (string) => {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Convert Romaji to Kana based on the case
function convertRomajiToKana(input, type) {
  const map = type === "hira" ? MAP_HIRA : MAP_KATA;
  let val = "";
  let tempInput = input;

  // Handle each character in the input string
  while (tempInput.length > 0) {
    const char = tempInput[0];
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
    const mapToUse = isUpper ? MAP_KATA : MAP_HIRA;

    // Try to match the longest possible Romaji
    let matched = false;
    for (const [romaji, kana] of mapToUse.sort(
      ([a], [b]) => b.length - a.length
    )) {
      const escapedRomaji = escapeRegExp(romaji);
      const regex = new RegExp(`^${escapedRomaji}`, "i");

      if (regex.test(tempInput)) {
        val += kana;
        tempInput = tempInput.substring(romaji.length); // Remove matched part
        matched = true;
        break;
      }
    }

    if (!matched) {
      // If no match, add the current character as is
      val += char;
      tempInput = tempInput.substring(1);
    }
  }

  return val;
}

export default function KeyboardJP() {
  const [kanaInput, setKanaInput] = useState("");
  const [kanjiInput, setKanjiInput] = useState("");
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [kanjiSuggestions, setKanjiSuggestions] = useState([]);

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
      console.log(kanjiInput);
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
          console.log(data.data);
        }
      } catch (error) {
        console.error("Error fetching Kanji suggestions:", error.message);
      }
    }
  };

  const handleKanjiClick = (kanji) => {
    setKanaInput((prev) => prev + kanji);
    setKanjiInput("");
    setKanjiSuggestions([]);
  };

  return (
    <div>
      <textarea
        value={kanaInput}
        onChange={handleKanaChange}
        placeholder="Type Romaji here (Hiragana and Katakana)"
      />
      <textarea
        value={kanjiInput}
        onChange={handleKanjiChange}
        placeholder="Type Romaji here (Hiragana and Katakana)"
      />
      <button onClick={fetchKanjiSuggestionsData}>Get Kanji Suggestions</button>
      <label>
        <input
          type="checkbox"
          checked={showDefinitions}
          onChange={() => setShowDefinitions((prev) => !prev)}
        />
        Show Definitions
      </label>
      <div>
        {kanjiSuggestions.map((entry, index) => (
          <div key={index}>
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
  );
}
