import React from "react";
import Performance from "../Performance/Performance";
import About from "../About/About";

function Detail(props) {
  return (
    <div className="  flex h-screen bg-slate-700  justify-center items-center w-1/5 flex-col relative ">
      {/* ********* ********* ********* ********* ********* ********* TARJETA DE USUARIO ********* ********* ********* *********  ********* ********* */}
      <div className=" h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
        <div className=" bg-emerald-700  w-20 h-20 rounded-full flex ">
          <img
            src={props.picture}
            alt="avatar"
            className="rounded-full "
          />
        </div>
        <p className=" font-bold text-24 pt-1 text-white">{props.name} </p>
        <p className=" font-light text-14 text-gray-400">
          Developer / FullStack
        </p>
      </div>
      <hr className=" border-gray-400 w-5/6 " />

      {/* ********* ********* ********* ********* ********* *********  INFORMACION DEL USUARIO ********* ********* ********* ********* ********* *********  */}
      <div className=" h-1/4 justify-center items-left text-left flex flex-col w-4/5 relative gap-2">
        <p className=" font-normal text-18 pt-1 text-gray-200">Contact Info</p>
        <div className="flex items-center gap-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" w-6 h-6 "
            viewBox="0 0 24 24"
            stroke="white"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          <p className=" font-normal text-14  text-white pt-0">
            {props.email}
          </p>
        </div>
        <hr className=" border-gray-400 w-11/12" />
        <div className="flex  gap-2 text-left items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="min-w-fit h-6 "
            viewBox="0 0 24 24"
            stroke="white"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          </svg>
          <p className=" font-normal text-14 pt-0 text-white">
            Telefono 321321332112
          </p>
        </div>
        <hr className=" border-gray-400 w-11/12" />
        <div className="gap-2 text-left flex items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" min-w-fit h-6 "
            viewBox="0 0 24 24"
            stroke="white"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="11" r="3" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
          <div>
            <p className=" font-normal text-14 pt-0 text-gray-200">
              Direcion 321 das12 sdahiuqhd 333 sadji, 444211
            </p>
          </div>
        </div>
      </div>
      <hr className=" border-gray-400 w-5/6 " />

      {props.performance ? <Performance /> : <About />}
    </div>
  );
}

export default Detail;
//
