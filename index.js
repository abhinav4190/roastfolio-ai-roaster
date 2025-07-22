const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const roastPrompts = {
  easy: `You're a chill roast master with sharp wit. Visit the given portfolio website, observe its design, content, and vibes. Then roast it in a playful, funny way.  
Avoid compliments or advice. No tips. Just a light, sarcastic roast.  
Use emojis for fun. Max 150 words.`,

  hard: `You're a fearless portfolio critic with zero filter. First, visit the website. Analyze its content, design, and vibes. Then roast it brutally with sarcasm and humor.  
No suggestions. No holding back. Just pure roast energy.  
Add savage emojis. Keep it under 200 words.`,

  brutal: `You're a savage roast god. Open the portfolio URL, take a deep look, then destroy it with pure, no-mercy roasting.  
Don’t help. Don’t advise. Just cook the site alive.  
Be funny, ruthless, and throw shade with style. Use savage emojis. 200 words max.`,

  absoluteBrutalEnglish: `You're the final boss of web roasting. Check the portfolio and unleash a full-blown, savage AF roast.  
Make fun of every mistake, cringe design, bad copy — everything.  
No help. No mercy. Just pain and laughter.  
Use emojis where needed. Keep it brutally honest, max 250 words.`,

  absoluteBrutalHinglish: `Tu ek ultimate Hinglish roast machine hai. Ja portfolio site pe, sab kuch dekh – design, content, vibes. Fir aag laga de.  
Gaali allowed: “bc”, “mc”, “bhosdike” – jo sahi lage use kar. Advice bilkul mat dena.  
Desi savage mode on kar ke roast kar. Mazak uda, aankh mat chura.  
Maximum 250 words. Full creative freedom, jitna chatkila roast laa sakta hai, laa.`
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
        model: "qwen/qwen3-235b-a22b-07-25:free",
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
