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
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-8 ">
      <h1 className=" text-white text-18 w-10/12 md:w-fit">Avances</h1>
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
  
  );
}
