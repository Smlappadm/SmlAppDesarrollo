import React from 'react'

export const Agendar = ({nameAgendar}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-screen mt-8">
    <h1 className="w-4/6 text-white text-18">Agendar con</h1>
    <div>
      <button
        value="vistaGeneral"
        className="flex justify-start items-center border-2 border-[#07A1F8] bg-[#07A1F8] text-white px-3 py-0.5 rounded-full text-18 w-72 h-12"
      >
      <img src="" alt="icono de Tiktok" className="mx-3 w-8 h-8" />
        Juan Pedro Gomez
      </button>
    </div>

  </div>
  )
}
