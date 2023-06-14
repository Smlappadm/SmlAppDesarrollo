import React from "react";
import Experiencia from "../../componentsClientes/Experiencia/Experiencia";
import Trofeos from "../../componentsClientes/Trofeos/Trofeos";

export const TrofeosXP = () => {
  return (
    <div className=" flex flex-col md:flex-row justify-center md:gap-9 items-center  mt-8">

      <Experiencia />

      <div className="flex flex-col">
        <Trofeos />
      </div>
    </div>
  );
};
