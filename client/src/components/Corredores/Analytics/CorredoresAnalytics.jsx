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
            <NavBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default CorredoresAnlaytics;
