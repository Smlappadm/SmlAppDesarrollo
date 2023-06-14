import React from "react";
import CustomsLabelAvances from "./CustomsLabelAvances/CustomsLabelAvances";

export default function Avances() {
  const avances = [
    { texto: "Videos Publicados", suma: "1", value: 17 },
    { texto: "Seguidores Ganados", suma: "15", value: 3585 },
    { texto: "Videos Acumulados", suma: "2700", value: 175900 },
    { texto: "Me Gusta Acumulados", suma: "375", value: 10900 },
  ];

  return (
    <div className="flex gap-5 flex-col justify-center items-center">
      <div className="mx-4">
        <div className="flex mb-4 items-end justify-between pt-4">
          <h1 className=" text-white text-18 w-10/12">Avances</h1>
        </div>
        <div>
          {avances.map((avance, index) => (
            <CustomsLabelAvances
              key={index}
              text={avance.texto}
              suma={avance.suma}
              value={avance.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
