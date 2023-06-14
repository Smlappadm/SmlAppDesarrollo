import React from "react";
import Recursos from "../../componentsClientes/Recursos/Recursos";
import { Agendar } from "../../componentsClientes/Agendar/Agendar";
import Avances from "../../componentsClientes/Avances/Avances";

export const VistaGeneral = () => {
  return (
    <div className="mb-20">
      <Avances />
      <Recursos />
      <Agendar />
    </div>
  );
};
