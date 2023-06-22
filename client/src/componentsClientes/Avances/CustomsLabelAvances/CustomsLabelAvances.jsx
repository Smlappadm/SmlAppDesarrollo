import React from "react";

export default function CustomsLabelAvances({ text, suma, sumaTotal, value }) {
  return (
    // Contenedor principal del avance
    <div className="flex justify-between gap-5 items-center rounded-xl py-4 my-2 bg-[#39394b]">
      {/* Texto del avance */}
      <p className="text-[#fff] font-bold ml-4">{text}</p>
      {/* Contenedor para mostrar las sumas y el valor */}
      <div className="flex gap-2">
        {/* Suma total */}
        <p className="text-[#0f0] font-bold">+ {sumaTotal}</p>
        {/* Suma */}
        <p className="text-[#0f0] font-bold">+ {suma}</p>
        {/* Valor */}
        <p className="text-[#fff] font-bold mr-5">{value}</p>
      </div>
    </div>
  );
}
