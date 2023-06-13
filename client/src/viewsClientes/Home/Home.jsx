import React, { useState } from "react";
import LandingClient from "../../componentsClientes/Landing/LandingClient";
import { VistaGeneral } from "../VistaGeneral/VistaGeneral";
import { TrofeosXP } from "../TrofeosXP/TrofeosXP";

export default function Home() {
  const [optionView, setOptionView] = useState("vistaGeneral");

  const handleViewChange = (event) => {
    setOptionView(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-screen overflow-y-auto">
      <LandingClient />
      {/* otras cosas del header */}

      <div className="flex gap-8 mt-7">
        <button
          value="vistaGeneral"
          onClick={handleViewChange}
          className={
            optionView === "vistaGeneral"
              ? "border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18"
              : " text-white px-3 py-0.5 rounded-full text-18 border-2"
          }
        >
          Vista general
        </button>
        <button
          value="trofeosXP"
          onClick={handleViewChange}
          className={
            optionView === "trofeosXP"
              ? "border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18"
              : "text-white px-3 py-0.5 rounded-full text-18 border-2"
          }
        >
          Trofeos y XP
        </button>
      </div>

      {optionView === "vistaGeneral" && <VistaGeneral />}
      {optionView === "trofeosXP" && <TrofeosXP />}
    </div>
  );
}
