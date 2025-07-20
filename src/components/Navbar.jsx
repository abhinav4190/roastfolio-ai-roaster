const Navbar = () => {
    return (
        <>
        <div className="flex justify-between max-[400px]:justify-center items-center">
            <img src="/assets/images/logo.png" width={80} alt="" srcset="" />
            <h1 className="font-space text-[20px] text-green-200 cursor-pointer max-[400px]:hidden">About Me</h1>
        </div>
        </>
    );
};

export default Navbar;
