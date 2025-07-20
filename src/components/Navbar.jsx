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
        <h1 className="font-space text-[20px] text-green-200 cursor-pointer max-[400px]:hidden">
          About Me
        </h1>
      </motion.div>
    </>
  );
};

export default Navbar;
