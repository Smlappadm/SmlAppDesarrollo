import React from "react";
import Nivel from "./Nivel/Nivel";
import Progreso from "./Progreso/Progreso";

export default function Experiencia() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-screen mt-8">
        <h1 className=" text-white text-18 w-10/12">Experiencia</h1>
      <Nivel />
      <Progreso />
    </div>
  );
}
