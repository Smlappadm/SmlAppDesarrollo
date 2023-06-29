import React, { useEffect, useState } from "react";
import igPng from "../../../Assets/instagram.png";
import tkPng from "../../../Assets/tik-tok.png";
import CircularProgressBar from "../CircularProgressbar/CircularProgressbar";

export default function FollowersDesktop({
  name,
  numberTotal,
  imgInstagram,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  const nameIG = localStorage.getItem("instagram");
  const [loading, setLoading] = useState(true);

  const formatearNumeroConPuntos = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (numberInstagram !== 0 || numberTiktok !== 0) {
      setLoading(false);
    }
  }, [numberInstagram]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-fit relative mt-3">
      <div className="flex justify-between w-[30rem]">
        <div className=" pt-10 justify-center items-center relative">
          <CircularProgressBar value={numberTotal} imageSrc={imgInstagram} />
          <p className="font-bold bottom-0 -right-7 absolute">
            {(numberTotal / 10000) * 100}%
          </p>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-3xl">{name}</span>
            {/* {nameIG !== "" ? (
              <span className="text-xl">@{nameIG}</span>
            ) : (
              <Link to="/clientes-settings">
                <button className="border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-6 py-2  rounded-full">
                  Agregar Instagram
                </button>
              </Link>
            )} */}
          </div>
          <div className="">
            <label
              htmlFor=""
              className="text-[45px] font-semibold text-white  px-2"
            >
              {formatearNumeroConPuntos(numberInstagram + numberTiktok)}
            </label>

            <label htmlFor="" className="text-[.7rem] top-9 absolute">
              / {maxNumber}
            </label>
          </div>
          <div className="absolute top-13">
            <label htmlFor="" className="font-thin ">
              followers
            </label>
          </div>
          <div className="flex justify-center items-center w-fit h-fit gap-4 mt-6">
            <img src={igPng} alt="icono de Instagram" className="w-8 h-8" />
            <label
              htmlFor=""
              className="text-[27px] text-white font-semibold  px-2 pb-1"
            >
              {formatearNumeroConPuntos(numberInstagram)}
            </label>
            <label className=" border-white bg-white w-[0.5px] h-5  text-white text-18"></label>
            <label
              htmlFor=""
              className="text-[27px] text-white font-semibold px-2 pb-1"
            >
              {formatearNumeroConPuntos(numberTiktok)}
            </label>
            <img src={tkPng} alt="icono de Tiktok" className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
