import React, { useEffect, useState } from "react";
import trofy1 from "../../Assets/med1.png";
import trofy2 from "../../Assets/med2.png";
import trofy3 from "../../Assets/med3.png";
import trofy4 from "../../Assets/med4.png";
import NavBarDesktop from "../Landing/NavBarDesktop/NavBarDesktop";
import CustomsIconsDesktop from "./CustomsIconsDesktop/CustomsIconsDesktop";

export default function TrofeosDesktop({ nivelPadre }) {
  const [trofeos, setTrofeos] = useState([
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy2, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
    { imagen: trofy1, isVisible: false },
  ]);

  const actualizarTrofeos = (nivel) => {
    const nuevosTrofeos = trofeos.map((trofeo, index) => {
      if (index + 1 <= nivel) {
        return { ...trofeo, isVisible: true };
      } else {
        return { ...trofeo, isVisible: false };
      }
    });

    setTrofeos(nuevosTrofeos);
  };
  useEffect(() => {
    actualizarTrofeos(nivelPadre);
  }, [nivelPadre]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBarDesktop />
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-5/12 mt-2">
          <h1 className="text-white font-semibold text-[2rem]">Trofeos</h1>
        </div>
        <div className="flex justify-center items-center gap-3 w-6/12 flex-wrap">
          {trofeos.map((trofeo, index) => (
            <div key={index}>
              <CustomsIconsDesktop
                imagen={trofeo.imagen}
                isVisible={trofeo.isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
