const express = require("express");
const axios = require("axios");
const KuroshiroModule = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const cors = require("cors"); // Import the cors package

// Initialize Kuroshiro
const Kuroshiro = KuroshiroModule.default;
const kuroshiro = new Kuroshiro();

(async () => {
  try {
    await kuroshiro.init(new KuromojiAnalyzer()); // Initialize Kuroshiro once
    console.log("Kuroshiro initialized successfully.");
  } catch (error) {
    console.error("Error initializing Kuroshiro:", error.message);
  }
})();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware to allow cross-origin requests

// Function to fetch word data from Jisho API
const fetchWordData = async (keyword) => {
  const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(
    keyword
  )}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching word data:", error.message);
    return null;
  }
};

// Function to convert Japanese text to Romaji using Kuroshiro
const convertToRomaji = async (text) => {
  try {
    const result = await kuroshiro.convert(text, { to: "romaji" });
    return result;
  } catch (error) {
    console.error("Error converting text to Romaji:", error.message);
    return null;
  }
};

// Route to get word info
app.get("/word/:keyword", async (req, res) => {
  const keyword = req.params.keyword;

  const data = await fetchWordData(keyword);

  if (data && data.data.length > 0) {
    const wordData = data.data[0];
    const japaneseWord = wordData.japanese[0].word || "N/A";
    const reading = wordData.japanese[0].reading || "N/A";
    const meanings = wordData.senses[0].english_definitions.join(", ");
    // Convert Japanese word to Romaji
    const romaji = await convertToRomaji(japaneseWord);

    const word = {
      Japanese: japaneseWord,
      Reading: reading,
      romaji: romaji,
      English: meanings,
    };

    res.json(word);
  } else {
    res.status(404).json({ message: "No data found for the keyword." });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
