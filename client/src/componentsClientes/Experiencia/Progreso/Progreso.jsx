import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from 'flowbite-react';
import LinearDeterminate from './LinearDeterminate';


export default function Progreso() {
  function formatearNumeroConPuntos(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className=" border-2 flex flex-col justify-center items-center gap-2 bg-[#404062] w-10/12 h-20 rounded-xl mb-24">
    <div className=" border-2 flex w-full justify-end items-center gap-5 mr-10">
      <label htmlFor="" className="text-green-400 font-semibold">+505</label>
      <label htmlFor="" className="font-bold text-24 text-white">{formatearNumeroConPuntos("23775")}</label>
      <label htmlFor="" className="font-bold text-24">/ {formatearNumeroConPuntos("35000")}</label>
    </div>
    <div className='border-2 w-full flex justify-center'>
    <LinearDeterminate/>
    </div>
  </div>
  )
}


