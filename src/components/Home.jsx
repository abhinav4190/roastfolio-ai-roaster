import DotBackground from "./DotBackground";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <DotBackground>
       <div className="px-10 py-5 max-lg:px-5">
        <Navbar/>
       </div>
      </DotBackground>
    </>
  );
};

export default Home;
