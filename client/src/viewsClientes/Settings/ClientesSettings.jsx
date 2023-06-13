import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import CustomsLabelSetting from "./CustomsLabelSetting/CustomsLabelSetting";

export default function ClientesSettings() {
  const texto = "Ajustes de perfil";
  const texto1 = "Notificaiones";
  const switchs1 = true;
  const texto2 = "Mis pagos";
  const texto3 = "Invitar a un amigo";
  const invitar3 = true;

  return (
    <div className="flex gap-5 mx-4 flex-col justify-between h-screen w-screen">
      <div>
        <div className="flex mb-4 items-end justify-between pt-4">
          <h2 className="font-bold">Personal</h2>
          <Link to={"/clientes-home"}>
            <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
          </Link>
        </div>
        <div>
          <CustomsLabelSetting text={texto} />
          <CustomsLabelSetting text={texto1} switchValue={switchs1} />
          <CustomsLabelSetting text={texto2} />
          <div className="mt-32">
            <CustomsLabelSetting text={texto3} invitar={invitar3} />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-4">
        <p>Cerrar Sesión</p>
      </div>
    </div>
  );
}
