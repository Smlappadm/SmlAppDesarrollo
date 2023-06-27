import React, { useEffect, useState } from "react";
import LandingClient from "../../componentsClientes/Landing/LandingClient";
import { VistaGeneral } from "../VistaGeneral/VistaGeneral";
import { TrofeosXP } from "../TrofeosXP/TrofeosXP";
import { useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail, updateClientProfile } from "../../redux/actions";

export default function Home() {
  const [optionView, setOptionView] = useState("vistaGeneral");
  const [access, setAccess] = useState();
  const { signOut } = useClerk();
  const { user } = useUser();
  const imgUser = user.imageUrl;
  const { client } = useSelector((state) => state);
  const dispatch = useDispatch();
  const userEmail = user.emailAddresses[0].emailAddress;
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const [nameIG, setNameIG] = useState("");
  const [imgInstagram, setImgInstagram] = useState(imgUser);
  const [numberInstagram, setNumberInstagram] = useState(0);
  const [numberTiktok, setNumberTiktok] = useState(0);
  const [numberTotal, setNumberTotal] = useState(0);
  const [maxNumber, setMaxNumber] = useState("10K");

  //Para verificar el acceso a la APP
  useEffect(() => {
    const tokenAccess = localStorage.getItem("access");
    if (tokenAccess) {
      setAccess(JSON.parse(tokenAccess));
    }
  }, []);

  //Para verificar los referidos
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

  //Para traer el Usuario Logueado
  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  //Para setear varios datos
  useEffect(() => {
    setName(client.username);
    setNumberTotal(numberTiktok + numberInstagram);
    name && setLoader(true);
  }, [client]);

  //Para Obtener Metricas de las redes sociales
  useEffect(() => {
    if (loader) {
      obtainMetricsInstagram();
    }
  }, [loader]);

  if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
    return <div>Loading...</div>;
  }
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

  const obtainMetricsInstagram = async () => {
    console.log("hi");
    const userIG = client && client.instagram.slice(26);
    const userTT = client && client.tiktok.slice(24);
    // const responseTT = await axios.get(
    //   `https://apiflask-td8y.onrender.com/obtener_info_tiktok?username=${userTT}`
    // );
    // const infoTT = responseTT.data;
    // const responseIG = await axios.get(
    //   `https://apiflask-td8y.onrender.com/obtener_info_instagram?username=${userIG}`
    // );
    // const infoIG = responseIG.data;
    const infoIG = { seguidores: "1051" };
    const infoTT = { seguidores: "501" };
    localStorage.setItem("instagram", userIG);
    localStorage.setItem("tiktok", userTT);
    setNumberInstagram(parseInt(infoIG.seguidores));
    setNumberTiktok(parseInt(infoTT.seguidores));
    const body = {
      seguidoresInstagramBase:
        client.seguidoresInstagramBase !== 0
          ? client.seguidoresInstagramBase
          : parseInt(infoIG.seguidores)
          ? parseInt(infoIG.seguidores)
          : 0,
      seguidoresTiktokBase:
        client.seguidoresTiktokBase !== 0
          ? client.seguidoresTiktokBase
          : parseInt(infoTT.seguidores)
          ? parseInt(infoTT.seguidores)
          : 0,
      seguidoresInstagram: parseInt(infoIG.seguidores),
      seguidoresTiktok: parseInt(infoTT.seguidores),
      seguidoresBase: client
        ? client.seguidoresInstagramBase + client.seguidoresTiktokBase
        : 0,
      seguidores: parseInt(infoIG.seguidores) + parseInt(infoTT.seguidores), //Descomentar y borrar la de abajo cuando funcione la api de tiktok
      //seguidores: parseInt(infoIG.seguidores),
      seguidoresGanados: client ? client.seguidores - client.seguidoresBase : 0,
    };
    console.log(body);
    try {
      dispatch(updateClientProfile(userEmail, body));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center bg-[#1A1A1A] w-screen h-full 2xl:h-screen pb-44">
      {access ? (
        <>
          <LandingClient
            imgInstagram={imgInstagram}
            setMaxNumber={setMaxNumber}
            numberTotal={numberTotal}
            name={name}
            setName={setName}
            numberInstagram={numberInstagram}
            numberTiktok={numberTiktok}
            maxNumber={maxNumber}
          />
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
