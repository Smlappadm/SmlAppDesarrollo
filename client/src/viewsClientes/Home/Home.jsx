import React, { useEffect, useState } from "react";
import LandingClient from "../../componentsClientes/Landing/LandingClient";
import { VistaGeneral } from "../VistaGeneral/VistaGeneral";
import { TrofeosXP } from "../TrofeosXP/TrofeosXP";
import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function Home() {
  const [optionView, setOptionView] = useState("vistaGeneral");
  const [access, setAccess] = useState();
  const { signOut } = useClerk();
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/clientes/");
        const client = response.data;
        const findClient = client.some((item) => item.email === userEmail);
        setAccess(findClient);
        localStorage.setItem("access", JSON.stringify(findClient));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tokenAccess = localStorage.getItem("access");
    if (tokenAccess) {
      setAccess(JSON.parse(tokenAccess));
    }
  }, []);

  if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
    return <div>Loading...</div>;
  }
  const userEmail = user.emailAddresses[0].emailAddress;
  const localRemove = () => {
    console.log("Removing access from localStorage");
    localStorage.removeItem("access");
  };

  const handleLogout = async () => {
    localRemove();
    await signOut();
  };
  const handleViewChange = (event) => {
    setOptionView(event.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-black via-[#020131]  to-blue-950 w-screen h-full 2xl:h-screen  pb-32">
      {access ? (
        <>
          <LandingClient />
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
      ) : (
        <>
          <p>SIN ACCESO</p>
          <button onClick={handleLogout}>LogOut</button>
        </>
      )}
    </div>
  );
}
