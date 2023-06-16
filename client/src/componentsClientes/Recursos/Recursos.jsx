import React, { useEffect } from "react";
import igPng from "../../Assets/instagram.png";
import tkPng from "../../Assets/tik-tok.png";
import gdPng from "../../Assets/googleDrive.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";
import { useUser } from "@clerk/clerk-react";

export default function Recursos() {
  const { client } = useSelector((state) => state);
  const { user } = useUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-8 ">
      <h1 className=" text-white text-18 w-10/12 md:w-fit">Recursos</h1>

      <Link
        to={`${client && client.drive}`}
        target={"_blank"}
        className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
      >
        <img src={gdPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
        Mi Carpeta Drive
      </Link>

      <Link
        to={`${client && client.instagram}`}
        target={"_blank"}
        className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
      >
        <img src={igPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
        Mi Instagram
      </Link>

      <Link
        to={`${client && client.tiktok}`}
        target={"_blank"}
        className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-10/12 h-12"
      >
        <img src={tkPng} alt="icono de Tiktok" className="mx-3 w-8 h-8" />
        Mi Tiktok
      </Link>
    </div>
  );
}
