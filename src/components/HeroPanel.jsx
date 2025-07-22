import { motion } from "motion/react";
import { use, useState } from "react";
import ResponseBox from "./ResponseBox";
import axios from "axios";
const HeroPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioURL, setPortfolioURL] = useState("");
  const [roastLevel, setRoastLevel] = useState("easy");
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const handleRoast = async () => {
    if (!portfolioURL.trim()) {
      setError("Please enter a portfolio URL");
      return;
    }
    if (!roastLevel) {
      setError("Please select a roast level");
      return;
    }
    try {
      new URL(portfolioURL);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setRes("");
      const response = await axios.post(
        "https://roastfolio-api.onrender.com/api/roast",
        {
          portfolioUrl: portfolioURL.trim(),
          roastLevel: roastLevel,
        }
      );

      const data = response.data;

      if (data.success) {
        setRes(data.roast);
      } else {
        throw new Error(data.error || "Failed to generate roast");
      }
    } catch (err) {
      if (err.message.includes("Unable to roast right now")) {
        setError(err.message);
      } else {
        setError(
          "Unable to roast right now. The roast master is taking a break! Try again later. 🔥💔"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl max-[465px]:text-4xl font-bold tracking-tight leading-[1.2] text-center"
        >
          Portfolio Roast Zone
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg text-center"
        >
          This roaster’s all in good fun — take the feedback, grow from it, and
          remember your skills are way bigger than any AI roast 😤
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col gap-4 w-full mt-6"
        >
          <motion.input
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3 }}
            type="text"
            placeholder="Paste your portfolio URL"
            className="px-4 py-3 focus:outline-none border border-neutral-700 rounded-lg bg-neutral-900 placeholder-gray-500 focus:ring-2 focus:ring-cyan-200"
            value={portfolioURL}
            onChange={(current) => setPortfolioURL(current.target.value)}
            disabled={isLoading}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <select
              value={roastLevel}
              onChange={(curr) => setRoastLevel(curr.target.value)}
              disabled={isLoading}
              className="appearance-none px-4 py-3 pr-12 bg-neutral-900 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-200 w-full hover:border-cyan-200"
            >
              <option value="easy">Easy 🥴</option>
              <option value="hard">Hard 🤬</option>
              <option value="brutal">Brutal 😈</option>
              <option value="absoluteBrutal">
                Absolute Brutal English (18+) ⚠️
              </option>
              <option value="hinglishBrutal">
                Absolute Brutal Hinglish (18+) ⚠️
              </option>
            </select>

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </motion.div>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-400 text-sm bg-yellow/20 border border-yellow rounded-lg px-3 py-2"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            whileHover={isLoading ? {} : { scale: 1.05 }}
            whileTap={isLoading ? {} : { scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className={`px-6 py-3 rounded-lg font-medium w-full
    ${
      isLoading
        ? "bg-gray-500 text-black opacity-50 cursor-not-allowed"
        : "bg-gradient-to-r from-[#8bc5a1] to-[#d56440] text-black"
    }`}
            onClick={handleRoast}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Cooking...
              </div>
            ) : (
              "Roast Me"
            )}
          </motion.button>
          <ResponseBox response={res} />
        </motion.div>
      </div>
    </>
  );
};

export default HeroPanel;
