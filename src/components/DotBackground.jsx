const DotBackground = ({ children }) => {
  return (
    <>
      <div className="bg-black w-screen h-screen relative">
        <div className="absolute inset-0 [background-image:radial-gradient(#404040_1px,transparent_1px)] [background-size:20px_20px]">
          <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
           <div className="relative z-50">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DotBackground;
