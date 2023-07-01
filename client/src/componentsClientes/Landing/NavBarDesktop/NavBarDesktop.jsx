import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

export default function NavBarDesktop() {
  const nameIG = localStorage.getItem("instagram");

  const location = useLocation();

  console.log(location.pathname);
  return (
    <div className="flex justify-center items-center ">
      <div className="flex items-center justify-around w-10/12 mt-4 rounded-lg bg-[#D9D9D9] bg-opacity-25">
        <Link to="/clientes-home" className="shadow-black shadow-2xl">
          <img
            className=" w-[5rem] "
            src="https://i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
          />
        </Link>

        <Link
          to="/clientes-home"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-home" ? "text-black" : "text-white"
          }`}
        >
          Vista General
        </Link>
        <Link
          to="/clientes-trofeos"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-trofeos"
              ? "text-[#1C72B2]"
              : "text-white"
          }`}
        >
          Trofeos
        </Link>
        <Link
          to="/clientes-recursos"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-recursos"
              ? "text-black"
              : "text-white"
          }`}
        >
          Recursos
        </Link>
        <Link
          to="/clientes-experiencia"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-experiencia"
              ? "text-[#1C72B2]"
              : "text-white"
          }`}
        >
          Experiencia
        </Link>
        <Link
          to="/clientes-home"
          className={`font-bold  hover:text-white ${
            location.pathname === "/clientes-contactenos"
              ? "text-[#1C72B2]"
              : "text-white"
          }`}
        >
          Contactenos
        </Link>

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
          className="font-bold hover:bg-[#2a286e] "
        >
          <AiOutlineVideoCameraAdd
            className="font-bold"
            color="#fff"
            size={30}
          />
        </Link>
        <Link
          to="/clientes-settings"
          className="flex justify-center items-center font-bold"
        >
          <IoSettingsOutline className="font-bold" color="#fff" size={26} />
        </Link>
      </div>
    </div>
  );
}
