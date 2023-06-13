import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import CustomsLabelSetting from "./CustomsLabelSetting/CustomsLabelSetting";

export default function ClientesSettings() {
  const texto = "Ajustes de perfil"
  const switchs = false
  const texto1 = "Notifícaiones"
  const switchs1 = true
  const texto2 = "Mis pagos"
  const switchs2 = false
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex items-end justify-between pt-4">
        <h2 className="font-bold">Personal</h2>
        <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
      </div>
      <CustomsLabelSetting text={texto} switchValue ={switchs} />
      <CustomsLabelSetting text={texto1} switchValue ={switchs1} />
      <CustomsLabelSetting text={texto2} switchValue ={switchs2} />
    </div>
  );
}
