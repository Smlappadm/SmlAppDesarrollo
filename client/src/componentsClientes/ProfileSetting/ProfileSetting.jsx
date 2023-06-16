import React from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function ProfileSetting({ handleProfileSetting }) {
  return (
    <>
      <div className=" flex mb-4 items-end justify-between pt-4">
        <h2 className="font-bold">Ajustes de Perfil</h2>
        <button
          onClick={handleProfileSetting}
          className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
        >
          <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
        </button>
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <input
          type="text"
          placeholder="Cambiar Nombre de Usuario"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          placeholder="Ingresar Instagram"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          placeholder="Ingresar TikTok"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          placeholder="Ingresar Google Drive"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <button className="w-5/12 text-center rounded-md mt-6 border h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 ">
          Guardar
        </button>
      </div>
    </>
  );
}
