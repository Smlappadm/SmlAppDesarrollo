import React from "react";
import { Link } from "react-router-dom";

export default function AddVideos() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen w-screen">
      <div className=" mx-10">
        <h2 className="font-bold text-neutral-100 text-center">
          Copia y pega el link de tu nuevo video para añadirlo
        </h2>
      </div>
      <div className="w-screen flex justify-center items-center">
        <input
          className="text-black w-screen p-2 m-4 rounded-lg"
          type="text"
          placeholder="Ingrese su link..."
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Atención:</p>
        <p>Las estadpisticas se actualizan 1 vez al dia</p>
      </div>
      <div className="flex flex-col gap-5 mt-20">
        <div className="text-white  rounded-full px-20 py-2 bg-[#07a1f8] hover:bg-[#127fbe]">
          <p className="text-[1.7rem] text-center">Añadir</p>
        </div>
        <Link to={"/clientes-home"}>
          <div className="text-gray-200 rounded-full px-20 py-2">
            <p className="text-[1.7rem] text-center">Cancelar</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
