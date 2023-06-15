import { useClerk } from "@clerk/clerk-react";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import CustomsLabelSetting from "./CustomsLabelSetting/CustomsLabelSetting";

export default function ClientesSettings() {
  const navigate = useNavigate();
  const texto = "Ajustes de perfil";
  const texto1 = "Notificaiones";
  const switchs1 = true;
  const texto2 = "Mis pagos";
  const texto3 = "Invitar a un amigo";
  const invitar3 = true;
  const { signOut } = useClerk();
  const handleLogout = async () => {
    await signOut();
    navigate("/clientes-home");
  };
  //*************** */
  return (
    <div className="flex bg-[#020131] gap-5  flex-col justify-center items-center h-screen w-screen">
      <div className="   justify-between w-96">
        <div className=" flex mb-4 items-end justify-between pt-4">
          <h2 className="font-bold">Personal</h2>
          <Link
            to={"/clientes-home"}
            className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
          >
            <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
          </Link>
        </div>
        <div className="">
          <CustomsLabelSetting text={texto} />
          <CustomsLabelSetting text={texto1} switchValue={switchs1} />
          <CustomsLabelSetting text={texto2} />
        </div>
        <div className="mt-16">
          <CustomsLabelSetting text={texto3} invitar={invitar3} />
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handleLogout}
          className="rounded-full px-6 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
         dark:focus:ring-gray-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
