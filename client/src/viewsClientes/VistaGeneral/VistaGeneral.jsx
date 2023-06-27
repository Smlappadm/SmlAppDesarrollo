import React from "react";
import Recursos from "../../componentsClientes/Recursos/Recursos";
import { Agendar } from "../../componentsClientes/Agendar/Agendar";
import Avances from "../../componentsClientes/Avances/Avances";

export const VistaGeneral = ({ seguidores, seguidoresGanados }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:gap-9 items-center w-full h-full mt-8">
      <Avances seguidores={seguidores} seguidoresGanados={seguidoresGanados} />

      <div className="flex flex-col">
        <Recursos />
        <Agendar />
      </div>
    </div>
  );
};
