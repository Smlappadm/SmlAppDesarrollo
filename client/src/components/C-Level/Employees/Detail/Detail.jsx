import React, { useState } from "react";
import LeadAsigned from "../TableEmployees/MaterialUi/LeadAsigned";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Detail({ cardEmail }) {
  const [leadAsigned, setLeadAsigned] = useState(0);

  const SendLeads = (name) => {
    toast.success(`✔ Leads asignados a el Freelancer ${name}  `, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const asignar = async () => {
    const response = await axios.get(
      `https://apisml.onrender.com/freelance?freelance=${cardEmail.name}&email=${cardEmail.email}&num_leads=${leadAsigned}`
    );
    SendLeads(cardEmail.name);
  };

  return (
    <div className="flex bg-slate-700 justify-start items-center w-4/12 flex-col">
      {cardEmail ? (
        <div className="w-10/12">
          <div className="h-1/4 justify-center items-center text-center flex flex-col w-full gap-2 relative">
            <div className="bg-emerald-700 w-20 h-20 rounded-full flex">
              <img
                src={cardEmail && cardEmail.photo}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="h-1/4 flex flex-col gap-7">
            <div className="flex justify-center">
              <h1 className="text-24 text-gray-200">
                Información del empleado
              </h1>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Nombre: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.name}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">País: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.country}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Nacimiento: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.birthdate}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Teléfono: </h2>
              <p className="font-normal text-14 pt-0 text-white">
                {cardEmail && cardEmail.contactNumber}
              </p>
            </div>
            <div className="flex gap-2 text-left items-center">
              <h2 className="text-white text-18">Email: </h2>
              <p className="font-normal text-14 text-white pt-0">
                {cardEmail && cardEmail.email}
              </p>
            </div>
            <div className="flex gap-2 text-left flex-col">
              <h2 className="text-white text-18">Sobre él: </h2>
              <div className="flex items-center justify-center">
                <p className="font-normal text-14 text-white pt-0">
                  {cardEmail && cardEmail.description}
                </p>
              </div>
            </div>

            {cardEmail.rol === "freelancer" ? (
              <div className="flex gap-5 items-center justify-start">
                <LeadAsigned
                  leadAsigned={leadAsigned}
                  setLeadAsigned={setLeadAsigned}
                />
                <div onClick={asignar}>
                  <Button size="large" variant="outlined">
                    Asignar
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-white">Selecciona un empleado</h1>
        </div>
      )}
    </div>
  );
}

export default Detail;
// {"props.performance" ? <Performance /> : <About />}
