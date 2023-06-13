import React, { useState } from "react";
import LandingClient from "../../componentsClientes/Landing/LandingClient";
import  {VistaGeneral}  from "../VistaGeneral/VistaGeneral";
import  {TrofeosXP}  from "../TrofeosXP/TrofeosXP";

export default function Home() {
  const [optionView, setOptionView] = useState("vistaGeneral")

  const handleViewChange = (event) => {
    setOptionView(event.target.value)
  }
  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <LandingClient />
      {/* otras cosas del header */}

      

      <div className="flex gap-8">
        <button value="vistaGeneral" onClick={handleViewChange}>Vista General</button>
        <button value="trofeosXP" onClick={handleViewChange}>Trofeos y XP</button>
      </div>

      {optionView === "vistaGeneral" && <VistaGeneral/>}
      {optionView === "trofeosXP" && <TrofeosXP/>}

    </div>
  );
}
