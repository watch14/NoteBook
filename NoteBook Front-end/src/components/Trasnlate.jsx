import React, { useState } from "react";
import { translateText } from "../utils/api"; // Ensure correct import path
import "../css/translate.css";

const Translate = () => {
  const [text, setText] = useState(""); // Text to translate
  const [translationData, setTranslationData] = useState({}); // State to hold all translation data
  const [error, setError] = useState(""); // State for error handling

  const handleTranslate = async () => {
    try {
      if (!text) {
        // Check if there is text to translate
        throw new Error("No text to translate.");
      }

      // Call the translateText function
      const data = await translateText(text);

      // Set the translation data
      setTranslationData(data);
      setError(""); // Clear any previous errors
      console.log("Translation data:", data);
    } catch (error) {
      setError(`Error translating text: ${error.message}`);
      console.error("Error translating text:", error.message);
    }
  };

  return (
    <div className="t-cont">
      <div className="t-title-bg">
        <h1 className="t-title">Translate</h1>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Translation Results</h2>
        <div>
          <h3>Hiragana</h3>
          <p>{translationData.hiragana}</p>
        </div>
        <div>
          <h3>Katakana</h3>
          <p>{translationData.katakana}</p>
        </div>
        <div>
          <h3>Romaji</h3>
          <p>{translationData.romaji}</p>
        </div>
        <div>
          <h3>Translation</h3>
          <p>{translationData.translation}</p>
        </div>
      </div>
    </div>
  );
};

export default Translate;
