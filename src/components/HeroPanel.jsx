import { motion } from "motion/react";
import { useState } from "react";
import ResponseBox from "./ResponseBox";
const HeroPanel = () => {
  const [res, setRes] = useState("");
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
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <select className="appearance-none px-4 py-3 pr-12 bg-neutral-900 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-200 w-full hover:border-cyan-200">
              <option value="">Easy 🥴</option>
              <option value="">Hard 🤬</option>
              <option value="">Brutal 😈</option>
              <option value="">Absolute Brutal English (18+) ⚠️</option>
              <option value="">Absolute Brutal Hinglish (18+) ⚠️</option>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="bg-gradient-to-r from-[#8bc5a1] to-[#d56440] px-6 py-3 rounded-lg font-medium text-black"
            onClick={() =>
              setRes(
                " Bro your UI looks like it got hit by a hurricane of fonts and colors 💀. Buttons are floating like they’ve got commitment issues, and your padding game? Non-existent. It's giving ‘I just discovered Tailwind and went wild’. The only thing responsive about your site is how quickly I closed the tab. But hey, 10/10 for bravery 🫡."
              )
            }
          >
            Roast Me
          </motion.button>
          <ResponseBox response={res} />
        </motion.div>
      </div>
    </>
  );
};

export default HeroPanel;
