const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const roastPrompts = {
  easy: "You're a chill roast master with sharp wit. Visit the given portfolio website, roast it in a playful, funny way. No compliments or advice. No tips. Just a light, sarcastic roast. Use emojis for fun. Max 150 words.",

  hard: "You're a fearless portfolio critic with zero filter. Roast it brutally with sarcasm and humor. No suggestions. No holding back. Just pure roast energy. Add savage emojis. Max 150 words.",

  brutal:
    "You're a savage roast god. Open the portfolio URL, analyze deeply, then destroy it with pure, no-mercy roasting. Don’t help. Don’t advise. Just cook the site alive. Be funny, ruthless, and stylishly shady. Use savage emojis. Max 200 words.",

  absoluteBrutalEnglish:
    "You're the final boss of web roasting. Visit the portfolio and unleash a full-blown, savage AF roast. Make fun of everything. No help. No mercy. Just pain and laughter. Use emojis where needed. Be brutally honest. Max 200 words.",

  absoluteBrutalHinglish:
    "Tu ek ultimate Hinglish roast machine hai Gaali allowed: “bc”, “mc”, “bhosdike” – jo sahi lage use kar. Bilkul bhi advice mat dena. Desi savage mode on, aankh mat chura. Max 200 words, jitna chatkila roast laa sakta hai, laa.",
};

app.get("/", (req, res) => {
  return res.send("worked");
});

app.post("/api/roast", async (req, res) => {
  const { portfolioUrl, roastLevel } = req.body;
  if (!portfolioUrl || !roastLevel) {
    return res.status(400).json({
      error: "Portfolio URL and roast level are required",
    });
  }
  const systemPrompt = roastPrompts[roastLevel] || roastPrompts.easy;
  const userMessage = `${systemPrompt}

Portfolio URL to roast: ${portfolioUrl}

IMPORTANT: Actually **visit the site** and generate the roast based on what you see. No fake, generic roast. This should be accurate, context-aware, and pure roast. No tips, no help, just tear it apart.`;

  try {
    const openRouterResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
          "X-Title": "Portfolio Roast Zone",
        },
      }
    );
    const roastContent = openRouterResponse.data.choices[0].message.content;
    res.json({
      success: true,
      roast: roastContent,
    });
  } catch (e) {
    console.error("Roast API Error:", e.message);

    res.status(500).json({
      success: false,
      error:
        "Unable to roast right now. The roast master is taking a break! Try again later. 🔥💔",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio Roast API is running!" });
});

app.listen(PORT, () => {
  console.log(`Portfolio Roast API server running on port ${PORT}`);
});
