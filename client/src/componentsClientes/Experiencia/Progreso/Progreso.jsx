import React from 'react'

export default function Progreso() {
  return (
    <div className=" flex  justify-center items-center gap-6 bg-[#404062] w-10/12 h-24 rounded-xl mb-24">
    <div className="  flex flex-col justify-center items-center relative h-fit w-20 ">
      <label htmlFor="" className="text-18 text-white font-medium top-0 absolute">Nivel</label>
      <label htmlFor="" className=" text-[65px] text-white mt-2">12</label>
    </div>
    <div className="flex flex-col justify-center items-center relative w-20 h-fit ">
      <label htmlFor="" className="text-18 text-white font-normal top-0 absolute">Ranking</label>
      <label htmlFor="" className=" text-[40px] text-white mt-4">2</label>
    </div>
  </div>
  )
}
