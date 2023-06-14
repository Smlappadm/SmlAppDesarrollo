import React, { useState } from "react";
import LandingClient from "../../componentsClientes/Landing/LandingClient";
import { VistaGeneral } from "../VistaGeneral/VistaGeneral";
import { TrofeosXP } from "../TrofeosXP/TrofeosXP";
import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function Home() {
  const [optionView, setOptionView] = useState("vistaGeneral");
  // const [access, setAccess] = useState(false);
  // const { signOut } = useClerk();
  // const { user } = useUser();
  // if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
  //   return <div>Loading...</div>;
  // }
  // const userEmail = user.emailAddresses[0].emailAddress;
  // console.log(userEmail);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/clientes/");
  //     const client = response.data;
  //     const findClient = client.some((item) => item.email === userEmail);
  //     setAccess(findClient);
  //     console.log(findClient);
  //   } catch (error) {
  //     console.error("Error al obtener los datos:", error);
  //   }
  // };

  // fetchData();

  // const handleLogout = async () => {
  //   await signOut();
  // };
  const handleViewChange = (event) => {
    setOptionView(event.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-[#020131] w-screen h-full 2xl:h-screen  pb-32">
      {/* {access ? ( */}
      <>
        <LandingClient />
        {/* otras cosas del header */}

        <div className="flex gap-8 mt-7">
          <button
            value="vistaGeneral"
            onClick={handleViewChange}
            className={
              optionView === "vistaGeneral"
                ? "border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2  rounded-full"
                : "rounded-full px-6 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            }
          >
            Vista general
          </button>
          <button
            value="trofeosXP"
            onClick={handleViewChange}
            className={
              optionView === "trofeosXP"
                ? "border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2 rounded-full"
                : "rounded-full px-6 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            }
          >
            Trofeos y XP
          </button>
        </div>

        {optionView === "vistaGeneral" && <VistaGeneral />}
        {optionView === "trofeosXP" && <TrofeosXP />}
      </>
      {/* ) : (
        <>
          <p>SIN ACCESO</p>
          <button onClick={handleLogout}>LogOut</button>
        </>
      )} */}
    </div>
  );
}

{
  /* <div className="text-white  rounded-full px-6 py-2 bg-[#07a1f8] hover:bg-[#127fbe]">
<p className="text-[1.4rem] text-center">Añadir</p>
</div>
<Link to={"/clientes-home"}>
<div className=" rounded-full px-6 py-2  text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
  <p className="text-[1.4rem] text-center">Cancelar</p>
</div> */
}
