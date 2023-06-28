import React from "react";
import { Link } from "react-router-dom";

export default function AddVideos() {
  return (
    <div className="flex bg-[#1A1A1A]  flex-col gap-2 justify-center items-center h-screen w-screen">
      <div className=" mx-10">
        <h2 className="font-bold text-neutral-100 text-center">
          Copia y pega el link de tu nuevo video para añadirlo
        </h2>
      </div>
      <div className="w-screen flex justify-center items-center">
        <input
          className="text-black  p-2 m-4 rounded-lg w-96"
          type="text"
          placeholder="Ingrese su link..."
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Atención:</p>
        <p>Las estadpisticas se actualizan 1 vez al dia</p>
      </div>
      <div className="flex  gap-5 mt-20">
        <Link to={"/clientes-home"}>
          <div className=" rounded-full px-5 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <p className="text-[1.4rem] text-center">Cancelar</p>
          </div>
        </Link>
        <div className="text-white  rounded-full px-10 py-2 bg-[#07a1f8] hover:bg-[#127fbe]">
          <p className="text-[1.4rem] text-center">Añadir</p>
        </div>
      </div>
    </div>
  );
}
