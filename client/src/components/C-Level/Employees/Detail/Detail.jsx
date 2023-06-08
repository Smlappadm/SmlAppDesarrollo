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
    <div className="  flex h-screen bg-slate-700  justify-center items-center w-1/5 flex-col relative ">
      {/* ********* ********* ********* ********* ********* ********* TARJETA DE USUARIO ********* ********* ********* *********  ********* ********* */}
      <div className=" h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
        <div className=" bg-emerald-700  w-20 h-20 rounded-full flex ">
          <img
            src={employ && employ.photo}
            alt="avatar"
            className="rounded-full "
          />
        </div>
        <p className=" font-bold text-24 pt-1 text-white"></p>
        <p className=" font-light text-14 text-gray-400">
          {employ && employ.name}
        </p>
      </div>

      {/* ********* ********* ********* ********* ********* *********  INFORMACION DEL USUARIO ********* ********* ********* ********* ********* *********  */}
      <div className=" h-1/4 justify-center items-left text-left flex flex-col w-4/5 relative gap-2">
        <p className=" font-normal text-18 pt-1 text-gray-200">Contact Info</p>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className=" font-normal text-14  text-white pt-0">
            Email: {employ && employ.birthdate}
          </p>
          <p className=" font-normal text-14  text-white pt-0">
            Email: {employ && employ.email}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <p className=" font-normal text-14 pt-0 text-white">
            Telefono: {employ && employ.contactNumber}
          </p>
        </div>
        <hr className=" border-gray-400 w-11/12" />
      </div>

      {"props.performance" ? <Performance /> : <About />}
    </div>
  );
}

export default Detail;
//
