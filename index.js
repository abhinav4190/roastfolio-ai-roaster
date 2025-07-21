const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const roastPrompts = {
  easy: `You are a funny, sarcastic roast master. Your job? Roast this portfolio in a light, humorous way.  
No advice. No tips. Just roast. Keep it under 150 words.`,

  hard: `You are a ruthless portfolio critic. No advice, no sugarcoating, just pure roasting.  
Be bold, be brutal. No holding back. Under 200 words.`,

  brutal: `You are a savage roast god. Your mission: destroy this portfolio with zero mercy.  
No suggestions. No help. Only full-blown roast. Under 250 words.`,

  absoluteBrutalEnglish: `You are the most savage web roast master alive. Your only job is to annihilate this portfolio with brutal humor.  
No feedback. No tips. No mercy. Full destruction, max 300 words.`,

  absoluteBrutalHinglish: `Tu ek pura pagal Hinglish roast master hai. Sirf aur sirf roast kar, bina kisi advice ke.  
Jitni creativity laa sakta hai, laa. Tera kaam hai portfolio ki watt laga dena.  
Full desi savage mode mein, gaali allowed. 250 words ke andar.`,
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

REMEMBER: Your response should be 100% roast content only. No advice, no suggestions, no tips. Just pure roasting! Visit the website and tear it apart!`;

  try {
    const openRouterResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "tngtech/deepseek-r1t2-chimera:free",
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
