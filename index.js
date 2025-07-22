const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const roastPrompts = {
  easy: "You're a witty comedy roast master analyzing a portfolio website. Focus on design choices, content quality, user experience, and overall presentation. Deliver a playful but sharp roast using observational humor about what you actually see - outdated designs, generic stock photos, typos, confusing navigation, or pretentious language. Keep it light and entertaining with clever wordplay. Use 2-3 relevant emojis. Roast only what's genuinely there - no assumptions. One flowing paragraph, max 150 words.",

  hard: "You're a ruthless creative director known for savage portfolio reviews. Dissect every element you can see - the hero section, project showcases, about page narcissism, contact form placement, loading speeds you can infer, and any cringe-worthy personal branding attempts. Mock the specific language used, design trends they're following poorly, and technical choices. Be brutally honest about what screams amateur hour. Include 4-5 brutal emojis. No mercy, just surgical precision roasting. One devastating paragraph, max 200 words.",

  brutal:
    "You're the Gordon Ramsay of web design criticism. Analyze this portfolio like you're Gordon tearing apart a failed restaurant. Roast every visible element with professional disgust - the layout disasters, typography crimes, color palette failures, content that reads like a high schooler wrote it, projects that look like weekend tutorials, and any delusions of grandeur in their copy. Reference specific things you see, not generic flaws. Use 5-6 savage emojis. Make them question their career choices. One ruthless paragraph, max 200 words.",

  absoluteBrutal:
    "You're the final boss of portfolio destruction. This is a complete creative execution - analyze EVERYTHING visible and roast with surgical precision and zero filter. Mock their design philosophy, project quality, writing skills, personal branding disasters, technical incompetence, and any laughable attempts at professionalism. Reference specific content, not generic criticisms. Destroy their confidence with sharp observations about what's actually there. Be hilariously savage but intelligent. 6+ devastating emojis. One paragraph of pure annihilation, max 200 words.",

  hinglishBrutal:
    "Tu ek ultimate Hinglish roast machine hai! Is portfolio ko dekh ke jo bhi bakwaas dikh raha hai - usko full tabaah kar de. Sirf Hindi words use kar jo English mein likhe hue hain (like 'kya bakwaas hai', 'kitna ghatiya design hai', 'bilkul bekar lagta hai'). English words bilkul use mat kar except for technical terms. Jo actual content site pe hai - generic templates, third-class projects, wannabe professional language - sab ko Hindi mein savage roast kar. Desi humor full on, thoda gaali bhi allowed (bc, mc, bhosdike). Hindi sentences banaa, bas English script mein likh. Emojis bhi daal jahan zaroori lage. Ek hi paragraph mein pura destruction, max 150 words. Koi advice nahi, sirf pure Hindi roast!",
};

const scrapeMultiplePages = async (baseUrl) => {
  const visited = new Set();
  const pagesToVisit = [baseUrl];
  const scrapedTexts = [];

  try {
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    const homeText = $("body").text().replace(/\s+/g, " ").trim();
    scrapedTexts.push(`URL: ${baseUrl}\n${homeText}`);

    const internalLinks = $("a")
      .map((i, el) => $(el).attr("href"))
      .get()
      .filter(Boolean)
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
      .slice(0, 3);

    for (const link of internalLinks) {
      const fullUrl = new URL(link, baseUrl).href;
      if (visited.has(fullUrl)) continue;
      visited.add(fullUrl);

      try {
        const { data } = await axios.get(fullUrl);
        const $$ = cheerio.load(data);
        const pageText = $$("body").text().replace(/\s+/g, " ").trim();
        scrapedTexts.push(`URL: ${fullUrl}\n${pageText}`);
      } catch (err) {
        console.warn(`Could not scrape: ${fullUrl}`);
      }
    }

    return scrapedTexts.join("\n\n---\n\n");
  } catch (err) {
    console.error("Main Scrape Failed:", err.message);
    return null;
  }
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
  const systemPrompt = roastPrompts[roastLevel];

  const scrapedContent = await scrapeMultiplePages(portfolioUrl);
  const userMessage = `${systemPrompt}

PORTFOLIO CONTENT TO ANALYZE:
${scrapedContent}

ROASTING INSTRUCTIONS:
- Analyze the ACTUAL content provided above - don't make assumptions
- Focus on real elements you can see: design choices, writing quality, project presentations, navigation, branding
- Reference specific things from their content, not generic web design issues  
- Be observational and clever, not random or mean-spirited
- Use humor that comes from what's genuinely there
- One flowing paragraph only - no line breaks, no \\n characters, no formatting
- Don't use any formatting like asterisks around words
- Stay within 200 words
- No advice, suggestions, or constructive criticism
- Pure roast based on what you actually observe`;

  try {
    const openRouterResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // model: "qwen/qwen3-235b-a22b-07-25:free",
         model: "google/gemini-2.0-flash-exp:free",
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
    
    const choices = openRouterResponse.data.choices;
    if (!choices || choices.length === 0 || !choices[0].message?.content) {
      console.error(
        "Invalid response format from OpenRouter:",
        openRouterResponse.data
      );
      return res.status(500).json({
        success: false,
        error: "Model did not return a valid response. Try again later.",
      });
    }

    const roastContent = choices[0].message.content;

    res.json({
      success: true,
      roast: roastContent,
    });
  } catch (e) {

    console.error("Roast API Error:", e);

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
