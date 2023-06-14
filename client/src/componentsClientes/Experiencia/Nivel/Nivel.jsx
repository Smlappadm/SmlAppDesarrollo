import React from 'react'
import gdImage from "../../../Assets/googleDrive.png"
export default function Nivel() {
  return (
    <div className="border-2 flex  justify-center items-center gap-3 w-screen bg-[#818080] h-32">
      <div className=" border-2 flex flex-col justify-center items-center w-screen relative">
        <label htmlFor="" className="text-18 text-white font-bold top-0 absolute">Nivel</label>
        <p htmlFor="" className=" text-[65px] text-white p-0 mt-4">12</p>
      </div>
      <div className="flex flex-col justify-center items-center  w-screen">
        <img src={gdImage} alt="imagen de trofeo" />
      </div>
      <div className="flex flex-col justify-center items-center  w-screen">
        <label htmlFor="">Ranking</label>
        <label htmlFor="">2</label>
      </div>
    </div>
  )
}
