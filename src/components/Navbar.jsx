import { motion } from "motion/react";
const Navbar = () => {
  return (
    <>
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
        className="flex justify-between max-[400px]:justify-center items-center py-5"
      >
        <img src="/assets/images/logo.png" width={80} alt="" srcset="" />
      <a href="https://x.com/Abhinav4190" target="_blank" rel="noopener noreferrer">  <h1 className="font-space text-[20px] text-green-200 cursor-pointer max-[400px]:hidden">
          About Me
        </h1></a>
      </motion.div>
    </>
  );
};

export default Navbar;
