import DotBackground from "./DotBackground";
import Navbar from "./Navbar";
import HeroPanel from "./HeroPanel";
import ResponseBox from "./ResponseBox";
import { motion } from "motion/react";
const Home = () => {
  return (
    <>
      <DotBackground>
        <div className="flex flex-col min-h-screen px-10 max-lg:px-5 ">
          <Navbar />
          <div className="flex flex-col mt-35 max-[400px]:mt-20  justify-center items-center gap-6">
            <HeroPanel />
            <ResponseBox />
          </div>

          <motion.div
            initial={{
              y: 30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            className="text-center text-[16px] text-white/70 pb-5 lg:mt-auto mt-30"
          >
            Built with 💀 by Abhinav
          </motion.div>
        </div>
      </DotBackground>
    </>
  );
};

export default Home;
