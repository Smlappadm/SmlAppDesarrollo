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
  const nameIG = localStorage.getItem("instagram");
  return (
    <div className="flex flex-col justify-center items-center w-10/12">
      <div className="flex justify-between w-screen">
        <div className=" justify-center items-center relative">
          <img
            className=" w-[5rem]"
            src="https://i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
            alt=""
          />
        </div>

        {nameIG !== "" ? (
          <span className="text-xl">@{nameIG}</span>
        ) : (
          <Link to="/clientes-settings">
            <button className="border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2  rounded-full">
              Agregar Instagram
            </button>
          </Link>
        )}
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
  );
}
