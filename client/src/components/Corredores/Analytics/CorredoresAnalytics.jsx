import { Link } from "react-router-dom";
import Nav from "../../Nav/Nav";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";

const CorredoresAnlaytics = () => {
  return (
    <>
      <Nav />
      <div className="w-full m-5 bg-[#222131]">
        <div className="flex justify-between items-center">
          <div className="flex  mt-5 ">
            <h1 className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2">
              History
            </h1>
            <NavBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default CorredoresAnlaytics;
