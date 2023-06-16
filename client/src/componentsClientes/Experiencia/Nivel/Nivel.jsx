import React from "react";
import medImage from "../../../Assets/med1.png";
export default function Nivel({ nivel }) {
  return (
    <div className=" flex  justify-center items-center gap-6 bg-[#404062] w-10/12 h-28 rounded-xl">
      <div className="flex flex-col justify-start items-center relative h-24 w-20 ">
        <label htmlFor="" className="text-18 text-white font-medium ">
          Nivel
        </label>
        <label htmlFor="" className=" text-[65px]  absolute top-3">
          <span class="bg-gradient-to-t from-blue-500 to-purple-500 text-transparent bg-clip-text font-extrabold">
            {nivel}
          </span>
        </label>
      </div>
      <div className=" rounded-full flex flex-col justify-center items-center w-24 h-24">
        <img src={medImage} alt="imagen de trofeo" />
      </div>
      <div className="flex flex-col justify-start items-center relative h-24 w-20 mt-4 ">
        <label htmlFor="" className="text-18 text-white font-medium ">
          Ranking
        </label>
        <label htmlFor="" className=" text-[40px] text-white absolute top-5">
          2
        </label>
      </div>
    </div>
  );
}
