import { Link } from "react-router-dom";
import Nav from "../../Nav/Nav";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

const CorredoresAnlaytics = () => {
  return (
    <>
      <Nav />
      <div className=" flex flex-col justify-start items-center w-full h-screen mx-5 ">
        <div className="w-full m-5 h-screen bg-[#222131]">
          <div className="flex gap-10 items-center mt-2 mx-5 ">
            <h1 className="font-bold text-[#e2e2e2] text-lg">
              Analytics
            </h1>
            <div className="flex gap-5">
              <Link to={"/corredores"}>
                <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/corredores-history"}>
                <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/corredores-analytics"}>
                <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorredoresAnlaytics;
