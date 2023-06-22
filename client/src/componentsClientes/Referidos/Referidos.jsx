import React from "react";

export default function Referral() {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <p className="text-white text-24 mt-4">REFERIDOS</p>
      <div className="h-3/6 w-full items-start overflow-auto px-4 mt-6 border border-white">
        <div className="flex items-center justify-between">
          <label className="m-4">Nombre del referido</label>
          <p>✅</p>
        </div>
      </div>
      <p className="text-center mt-4">
        Beneficios: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Soluta, ullam, voluptatem dolorem iste placeat beatae, blanditiis vel
        debitis veritatis excepturi minus! Odio corporis pariatur, sapiente
        ullam facilis et accusantium ipsum?
      </p>
      <button className="w-11/12 text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-white justify-center items-center flex ">
        Copiar Link de Referido!
      </button>
    </div>
  );
}
