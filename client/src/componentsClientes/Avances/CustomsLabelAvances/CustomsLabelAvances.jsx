import React from "react";
import igPng from "../../../Assets/instagram.png";
import tkPng from "../../../Assets/tik-tok.png";
export default function CustomsLabelAvances({
  text,
  ganadosTT,
  ganadosIG,
  IG,
  TT,
}) {
  return (
    // Contenedor principal del avance
    <div className="flex justify-between gap-5 items-center rounded-xl py-4 my-2 bg-[#282828]">
      {/* Texto del avance */}
      <div className="w-10">
        <p className="text-[#fff] text-[.7rem] font-bold ml-4">{text}</p>
      </div>
      {/* Contenedor para mostrar las sumas y el valor */}
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="flex gap-5 justify-center items-center">
            {ganadosTT ? (
              <p className="text-[#0f0] font-bold">+{ganadosIG}</p>
            ) : null}
            <p className="text-[#fff] text-[1.2rem] font-bold mr-5">{IG}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-5 justify-center items-center">
            {ganadosTT ? (
              <p className="text-[#0f0] font-bold">+{ganadosTT}</p>
            ) : null}
            <p className="text-[#fff] text-[1.2rem] font-bold mr-5">{TT}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
