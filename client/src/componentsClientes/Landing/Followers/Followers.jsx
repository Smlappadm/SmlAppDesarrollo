import React, { useEffect } from "react";
import igPng from "../../../Assets/instagram.png"
import tkPng from "../../../Assets/tik-tok.png"

export default function Followers({ numberInstagram, numberTiktok, maxNumber }) {

  function formatearNumeroConPuntos(numero) {
    return numero && numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }



  return (
    <div className="flex flex-col justify-start items-center w-fit h-fit">
      <div>
        <label htmlFor="" className="text-[45px] text-white font-medium px-2">
          {formatearNumeroConPuntos((numberInstagram + numberTiktok))}
        </label>
        <label htmlFor="">/ {maxNumber}</label>
      </div>
      <div className="">
        <label htmlFor="" className="font-thin ">
          followers
        </label>
      </div>
      <div className="flex justify-center items-center w-fit h-fit gap-4 mt-5">
        <img src={igPng} alt="icono de Instagram" className="w-8 h-8"/>
      <label htmlFor="" className="text-[27px] text-white font-medium  px-2 pb-1">
          {formatearNumeroConPuntos(numberInstagram)}
        </label>
        <label className=" border-white bg-white w-[0.5px] h-5  text-white text-18"></label>
        <label htmlFor="" className="text-[27px] text-white font-medium px-2 pb-1">
          {formatearNumeroConPuntos(numberTiktok)}
        </label>
        <img src={tkPng} alt="icono de Tiktok" className="w-8 h-8"/>
      </div>
    </div>
  );
}
