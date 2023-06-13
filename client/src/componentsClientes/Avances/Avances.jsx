import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import CustomsLabelAvances from "./CustomsLabelAvances/CustomsLabelAvances";

export default function Avances() {
  const texto = "Videos Publicados";
  const suma = "+1";
  const value = 17
  const texto1 = "Seguidores Ganados";
  const suma1 = "+15";
  const texto2 = "Videos Acumulados";
  const suma2 = "+2700";
  const texto3 = "Me Gusta Acumulados";
  const suma3 = "+1";
  return (
    <div className="flex gap-5 flex-col justify-between h-screen w-screen">
      <div className="mx-4">
        <div className="flex mb-4 items-end justify-between pt-4">
          <h2 className="font-bold">Avances</h2>
        </div>
        <div>
          <CustomsLabelAvances text={texto} />
          <CustomsLabelAvances text={texto1} />
          <CustomsLabelAvances text={texto2} />
          <CustomsLabelAvances text={texto3} />
        </div>
      </div>
    </div>
  );
}
