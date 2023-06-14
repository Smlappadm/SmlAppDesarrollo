import React from 'react'
import gdImage from "../../../Assets/googleDrive.png"
export default function Nivel() {
  return (
    <div className=" flex  justify-center items-center gap-6 bg-[#404062] w-10/12 h-28 rounded-xl">
      <div className="flex flex-col justify-start items-center relative h-24 w-20 ">
        <label htmlFor="" className="text-18 text-white font-medium ">Nivel</label>
        <label htmlFor="" className=" text-[65px] text-white absolute top-3">12</label>
      </div>
      <div className="bg-yellow-400 rounded-full flex flex-col justify-center items-center w-24 h-24">
        <img src={gdImage} alt="imagen de trofeo" />
      </div>
      <div className="flex flex-col justify-start items-center relative h-24 w-20 mt-4 ">
        <label htmlFor="" className="text-18 text-white font-medium ">Ranking</label>
        <label htmlFor="" className=" text-[40px] text-white absolute top-5">2</label>
      </div>
    </div>
  )
}
