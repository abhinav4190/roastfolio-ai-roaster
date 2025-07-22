import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ResponseBox = ({ response }) => {
  const [showBox, setShowBox] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (response) {
      setShowBox(true);
      setTypedText(" ");
      setDoneTyping(false);
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(response.substring(0, i + 1));

        i++;
        if (i === response.length) {
          clearInterval(interval);
          setDoneTyping(true);
        }
      }, 25);

      return () => clearInterval(interval);
    }
  }, [response]);

  return (
    <AnimatePresence>
      {showBox && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mt-5 p-6 pt-5 pb-10 mb-5 rounded-lg bg-white/5 border border-white/20 backdrop-blur-md text-white shadow-lg"
        >
          <p className="whitespace-pre-line text-base leading-relaxed pb-2">
            {typedText}
          </p>

          {doneTyping && (
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `My portfolio got roasted! 🔥\nDare to try with your portfolio?\n\n👉 roastfolio.abhinav.chat`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-3 right-4 px-3 py-1 text-sm bg-cyan-200 hover:bg-cyan rounded-md text-white"
              >
                Share on X
              </motion.button>
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseBox;
