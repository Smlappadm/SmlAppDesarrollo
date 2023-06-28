import React from "react";

export default function CustomsLabelAvances({ text, suma, sumaTotal, value }) {
  return (
    // Contenedor principal del avance
    <div className="flex justify-between gap-5 items-center rounded-xl py-4 my-2 bg-[#282828]">
      {/* Texto del avance */}
      <div className="w-10">
        <p className="text-[#fff] text-[.7rem] font-bold ml-4">{text}</p>
      </div>
      {/* Contenedor para mostrar las sumas y el valor */}
      <div className="flex gap-2">
        <div className="flex gap-5 justify-center items-center">
          {/* Suma total */}
          {sumaTotal ? (
            <p className="text-[#0f0] font-bold">+{sumaTotal}</p>
          ) : null}
          {/* Suma */}
          {/* <p className="text-[#0f0] text-[0.8rem] font-bold">+ {suma}</p> */}
          {/* Valor */}
          <p className="text-[#fff] text-[1.2rem] font-bold mr-5">{value}</p>
        </div>
      </div>
    </div>
  );
}
