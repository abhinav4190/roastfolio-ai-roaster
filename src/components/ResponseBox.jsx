import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ResponseBox = ({ response }) => {
  const [showBox, setShowBox] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (response) {
      setShowBox(true);
      setTypedText("");
      setDoneTyping(false);
      let i = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + response[i]);
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
          className="relative mt-5 p-6 pb-10 rounded-lg bg-white/5 border border-white/20 backdrop-blur-md text-white shadow-lg"
        >
          <p className="whitespace-pre-line text-base leading-relaxed">
            {typedText}
          </p>

          {doneTyping && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-3 right-4 px-3 py-1 text-sm bg-cyan-200 hover:bg-cyan rounded-md text-white"
            >
              Share on X
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseBox;
