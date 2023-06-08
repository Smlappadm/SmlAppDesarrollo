import React, { useEffect, useState } from "react";
import Performance from "../Performance/Performance";
import About from "../About/About";
import axios from "axios";

function Detail({ cardEmail }) {
  const [employ, setEmploy] = useState(null);

  useEffect(() => {
    if (cardEmail) {
      axios
        .get(`/employees/email/?email=${cardEmail}`)
        .then((response) => {
          const employData = response.data;
          setEmploy(employData[0]);
        })
        .catch((error) => {
          // Manejar el error de alguna manera
        });
    }
  }, [cardEmail, setEmploy]);

  console.log(employ);

  return (
    <div className="  flex bg-slate-700  justify-start items-center w-1/5 flex-col ">
      {/* ********* ********* ********* ********* ********* ********* TARJETA DE USUARIO ********* ********* ********* *********  ********* ********* */}
      <div className=" h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
        <div className=" bg-emerald-700  w-20 h-20 rounded-full flex ">
          <img
            src={employ && employ.photo}
            alt="avatar"
            className="rounded-full "
          />
        </div>
      </div>

      {/* ********* ********* ********* ********* ********* *********  INFORMACION DEL USUARIO ********* ********* ********* ********* ********* *********  */}
      <div className=" h-1/4 flex flex-col w-4/5 gap-2">
        <div className="flex justify-center">
          <h1 className=" text-18 text-gray-200">Informacion del empleado</h1>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className="font-normal text-14 text-white pt-0">
            Nombre: {employ && employ.name}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className="font-normal text-14 text-white pt-0">
            Pais: {employ && employ.country}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className="font-normal text-14 text-white pt-0">
            Nacimiento: {employ && employ.birthdate}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className=" font-normal text-14 pt-0 text-white">
            Telefono: {employ && employ.contactNumber}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className=" font-normal text-14  text-white pt-0">
            Email: {employ && employ.email}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className=" font-normal text-14  text-white pt-0">
            Sobre el: {employ && employ.description}
          </p>
        </div>
      </div>

      {/* {"props.performance" ? <Performance /> : <About />} */}
    </div>
  );
}

export default Detail;
//
