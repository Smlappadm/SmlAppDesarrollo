import React, { useState } from "react";
export default function Home() {
  const [register, setRegister] = useState(false);

  return (
    <>
      {register === false ? (
        <div className="w-screen h-screen bg-[#020131] flex flex-col justify-center items-center">
          <div className="flex flex-col w-3/4 gap-y-4">
            <label className="font-bold ml-2" htmlFor="">
              Usuario:
            </label>
            <input
              className="rounded-md bg-[#404062] h-7 pl-2"
              type="text"
              placeholder="Ingresar Usuario"
            />
            <label className="font-bold ml-2" htmlFor="">
              Contraseña:
            </label>
            <input
              className="rounded-md bg-[#404062] h-7 pl-2"
              type="text"
              placeholder="Ingresar Contraseña"
            />
            <div className="flex flex-col items-center gap-y-4 mt-4">
              <button className="bg-[#07a1f8] rounded-2xl px-3 text-black">
                Ingresar
              </button>
              <div className="flex ">
                <p>¿No tienes cuenta?</p>
                <button className="text-blue-600 ml-1">Crea una!</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
