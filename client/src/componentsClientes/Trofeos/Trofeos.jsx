import React, { useState } from "react";
import CustomsIcons from "./CustomsIcons/CustomsIcons";
import trofy1 from "../../Assets/med1.png";
import trofy2 from "../../Assets/med2.png";
import trofy3 from "../../Assets/med3.png";
import trofy4 from "../../Assets/med4.png";

export default function Trofeos() {
  const [trofeos, setTrofeos] = useState([
    { imagen: trofy2, isVisible: true },
    { imagen: null, isVisible: false },
    { imagen: null, isVisible: false },
    { imagen: null, isVisible: false },
    { imagen: trofy4, isVisible: true },
    { imagen: null, isVisible: false },
    { imagen: null, isVisible: false },
    { imagen: null, isVisible: false },
    { imagen: trofy3, isVisible: true },
    { imagen: null, isVisible: false },
    { imagen: trofy1, isVisible: true },
    { imagen: null, isVisible: false },
  ]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className=" text-white ml-8 text-18 ">Avances</h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-10/12">
          {trofeos.map((trofeo, index) => (
            <div key={index}>
              <CustomsIcons
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
