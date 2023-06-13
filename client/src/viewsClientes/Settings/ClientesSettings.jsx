import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import CustomsLabelSetting from "./CustomsLabelSetting/CustomsLabelSetting";

export default function ClientesSettings() {
  const texto = "Ajustes de perfil"
  const texto1 = "Notificaiones"
  const switchs1 = true
  const texto2 = "Mis pagos"
  const texto3 = "Invitar a un amigo"
  return (
    <div className="flex  mx-4 flex-col h-screen w-screen">
      <div className="flex items-end justify-between pt-4">
        <h2 className="font-bold">Personal</h2>

        <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
      </div>
      <CustomsLabelSetting text={texto} />
      <CustomsLabelSetting text={texto1} switchValue ={switchs1} />
      <CustomsLabelSetting text={texto2} />
      <CustomsLabelSetting text={texto3} />
    </div>
  );
}
