import React, { useEffect, useState } from "react";
import igPng from "../../../Assets/instagram.png";
import tkPng from "../../../Assets/tik-tok.png";

export default function Followers({
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
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
  );
}
