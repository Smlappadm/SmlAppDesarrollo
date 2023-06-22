import React from "react";
import Referral from "../../componentsClientes/Referidos/Referidos";

export default function Referidos() {
  return (
    <div className="flex bg-gradient-to-br from-black via-[#020131]  to-blue-950 gap-5  flex-col justify-start items-center h-screen w-screen">
      <div className=" w-96">
        <Referral />
      </div>
    </div>
  );
}
