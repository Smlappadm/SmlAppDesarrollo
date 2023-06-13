import React from "react";
import igPng from "../../Assets/instagram.png";
import tkPng from "../../Assets/tik-tok.png";
import gdPng from "../../Assets/googleDrive.png";

export default function Recursos() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-screen mt-8">
      <h1 className="w-4/6 text-white text-18">Recursos</h1>
      <div>
        <button
          value="vistaGeneral"
          className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-72 h-12"
        >
        <img src={gdPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Carpeta Drive
        </button>
      </div>
      <div>
        <button
          value="vistaGeneral"
          className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-72 h-12"
        >
        <img src={igPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Instagram
        </button>
      </div>
      <div>
        <button
          value="vistaGeneral"
          className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-72 h-12"
        >
        <img src={tkPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
          Mi Tiktok
        </button>
      </div>
    </div>
  );
}
