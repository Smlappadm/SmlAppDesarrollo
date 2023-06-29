import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import CircularProgressBar from "../CircularProgressbar/CircularProgressbar";

export default function HeaderDesktop({
  numberTotal,
  setCustomValue,
  imgInstagram,
}) {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex justify-between w-screen">
        <div className=" justify-center items-center relative">
          <img
            className=" w-[5rem]"
            src="https://i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
            alt=""
          />
        </div>
        <div className="flex  justify-center items-start gap-3 pt-4">
          <Link
            to="/clientes-addvideos"
            className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
          >
            <AiOutlineVideoCameraAdd
              className="font-bold"
              color="#fff"
              size={30}
            />
          </Link>
          <Link
            to="/clientes-settings"
            className="flex justify-center items-center font-bold pt-0.5 md:pt-0 md:border-2 md:border-[#211f52] md:rounded-lg md:w-8 md:h-8 hover:bg-[#2a286e] "
          >
            <IoSettingsOutline className="font-bold" color="#fff" size={26} />
          </Link>
        </div>
      </div>
    </div>
  );
}
