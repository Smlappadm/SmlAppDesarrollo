import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiEdit } from "react-icons/ci";
import { MdPriceCheck } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";

import { ToastContainer, toast } from "react-toastify";
// import toast, { Toaster } from 'react-hot-toast';
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { motion, spring } from "framer-motion";
import {
  AiOutlineConsoleSql,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineEuroCircle,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { BsCurrencyEuro } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#39394B",
  border: "none",
  boxShadow: 24,
  pt: 4,
  px: 6,
  pb: 4,
};

//************************************************************************************************ */
function ChildModalHistory({
  item,
  setOpen,
  SendLeadAlertBaja,
  SendErrorUpdateAlertBaja,
  updateLeads,
  llamadoVenta,
  emailAddress,
  fullName,
  cancelModal,
}) {
  const [openChild, setOpenChild] = React.useState(false);

  const handleOpen = () => {
    setOpenChild(true);
  };

  const handleClose = () => {
    setOpenChild(false);
  };

  const handleUpdate = async () => {
    try {
    } catch (error) {
      SendErrorUpdateAlertBaja();
    }
    setOpenChild(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#161616] dark:hover:bg-[#1f1f1f] focus:outline-none dark:focus:ring-blue-800"
          onClick={handleOpen}
        >
          Solicitar Baja
        </button>
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleCancel}
        >
          Cerrar x
        </button>
      </div>
      <Modal
        open={openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            borderRadius: 5,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center mb-5 ">
            Deseas dar de bajdxcccccccccccccccccca al cliente?
          </h2>
          <div className="flex justify-around items-center m-5">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-[#bbbaba] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  item,
  SendLeadAlertBaja,
  SendIncidenceAlert,
  SendErrorUpdateAlertBaja,
  tamañoPantalla,
  pressLinkButtonHandler,
  promo,
  promoParametro
}) {
  const [open, setOpen] = React.useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyClick = (copyToProps) => {
    navigator.clipboard
      .writeText(copyToProps)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      })
      .catch((err) => alert(`Error al copiar: ${err}`));
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <p
          className={
            tamañoPantalla === "Pequeña"
              ? "text-white bg-black w-full py-3 text-18 rounded-2xl text-center"
              : "text-white bg-blue-950 w-full py-3 text-18 rounded-2xl text-center hover:bg-blue-600 whitespace-nowrap px-3"
          }
          onClick={handleOpen}
        >
          Confirmar selección
        </p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 550,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="w-full flex flex-col justify-center items-center mt-2 gap-10 text-white">
            {showCopiedMessage && (
              <p className="absolute -top-20 w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 mt-2 bg-[#2bca80] hover:bg-[#3f437a] cursor-pointer">
                Copiado!
              </p>
            )}
           
<p>¿Desear confirmar la seleccion del tipo de pago?</p>
<p>{promo}</p>

                        <div className="flex justify-around items-center m-5 gap-10 text-white">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-white bg-blue-800 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2"
              onClick={() =>
                pressLinkButtonHandler(promoParametro)
              }
            >
              Si
            </button>
          </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
