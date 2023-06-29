import React from "react";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";
import Recursos from "./Recursos";

export default function RecursosDesktop({ tamañoPantalla }) {
  return (
    <div className="w-full h-screen bg-[#020131] flex flex-col ">
      <NavBarDesktop />
      <div className="h-5/6 flex items-center justify-end w-10/12 ">
        <div className=" bg-[#363559] h-3/6  flex rounded-2xl w-3/6">
          <Recursos tamañoPantalla={tamañoPantalla} />
        </div>
      </div>
    </div>
  );
}
