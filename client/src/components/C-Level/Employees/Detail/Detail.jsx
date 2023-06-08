import React from "react";

function Detail({ cardEmail }) {
  console.log(cardEmail);
  return (
    <div className="flex bg-slate-700 justify-start items-center w-4/12 flex-col">
      {/* ********* ********* ********* ********* ********* ********* TARJETA DE USUARIO ********* ********* ********* *********  ********* ********* */}
      <div className=" h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
        <div className=" bg-emerald-700 w-20 h-20 rounded-full flex ">
          <img
            src={cardEmail && cardEmail.photo}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>

      {/* ********* ********* ********* ********* ********* *********  INFORMACION DEL USUARIO ********* ********* ********* ********* ********* *********  */}
      <div className=" h-1/4 flex flex-col w-4/5 gap-7">
        <div className="flex justify-center">
          <h1 className=" text-24 text-gray-200">Informacion del empleado</h1>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <h2 className="text-white text-18">Nombre: </h2>
          <p className="font-normal text-14 text-white pt-0">
            {cardEmail && cardEmail.name}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <h2 className="text-white text-18">Pais: </h2>
          <p className="font-normal text-14 text-white pt-0">
            {cardEmail && cardEmail.country}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <h2 className="text-white text-18">Nacimiento: </h2>
          <p className="font-normal text-14 text-white pt-0">
            {cardEmail && cardEmail.birthdate}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <h2 className="text-white text-18">Telefono: </h2>
          <p className=" font-normal text-14 pt-0 text-white">{cardEmail && cardEmail.contactNumber}
          </p>
        </div>
        <div className="flex  gap-2 text-left items-center">
          <h2 className="text-white text-18">Email: </h2>
          <p className=" font-normal text-14  text-white pt-0">
            {cardEmail && cardEmail.email}
          </p>
        </div>
        <div className="flex gap-2 text-left flex-col">
          <h2 className="text-white text-18">Sobre el: </h2>
          <div className="flex items-center justify-center ">
            <p className=" font-normal text-14  text-white pt-0">
              {cardEmail && cardEmail.description}
            </p>
          </div>
        </div>
      </div>

      {/* {"props.performance" ? <Performance /> : <About />} */}
    </div>
  );
}

export default Detail;
//
