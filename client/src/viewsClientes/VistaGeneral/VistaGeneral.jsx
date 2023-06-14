import React from "react";
import Recursos from "../../componentsClientes/Recursos/Recursos";
import { Agendar } from "../../componentsClientes/Agendar/Agendar";
import Avances from "../../componentsClientes/Avances/Avances";

export const VistaGeneral = () => {
  return (
    <div className="border-2 flex flex-col md:flex-row justify-center items-center w-screen">
      <div className="border-2 w-full">
        <Avances />
      </div>
      <div className="flex flex-col border-2 w-full ">
        <Recursos />
        <Agendar />
      </div>
    </div>
  );
};
