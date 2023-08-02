import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiEdit } from "react-icons/ci";
import { MdPriceCheck } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import ResponsiveDateTimePickers from "./ResponsiveDateTimePickers";
import { ToastContainer, toast } from "react-toastify";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { motion, spring } from "framer-motion";
import styles from "./Modal.module.css";
import {
  AiOutlineConsoleSql,
  AiOutlinePhone,
  AiOutlineUserAdd,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
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
function ChildModal({
  item,
  setOpen,
  statusObj,
  SendLeadAlert,
  SendErrorUpdateAlert,
  updateLeads,
  llamadoVenta,
  handleLlamadoVentaChange,
  emailAddress,
  fullName,
  cancelModal,
  setStatusObj,
  updatedEmailApp,
  SendEmailLeadAlertError,
  SendEmailLeadAlertErrorCuotas,
  editEmail,
  editInstagram,
  editTelephone,
  editEmailApp,
  editContacto,
  saveEmailAppFunction,
  openModalPagoFunction,
  flagPago,
  openTimeHour,
}) {
  const [openChild, setOpenChild] = React.useState(false);

  const handleOpen = () => {
    if (
      location.pathname === "/vendedores" ||
      location.pathname === "/ventas-dashboard"
    ) {
      setStatusObj({ ...statusObj, status: "Contactado" });
    }

    if (statusObj.status === "Contactado") {
      setStatusObj({ ...statusObj, pagoRecibido: false });
    }
    if (statusObj.status === "Contratado") {
      let valorCuota = statusObj.pagos.monto / statusObj.pagos.cuotas;
      if (valorCuota < 200) {
        SendEmailLeadAlertErrorCuotas();
        return;
      }
      setStatusObj({
        ...statusObj,
        pagos: {
          ...statusObj.pagos,
          monto: Number(statusObj.pagos.monto),
          valorCuota: valorCuota,
          cuotas: Number(statusObj.pagos.cuotas),
          cuotasPagadas: 0,
        },
      });

      let updatedPagos = "";
      if (statusObj.status_op === "1/4000/4000") {
        updatedPagos = "www.1";
      } else if (statusObj.status_op === "2/2500/5000") {
        updatedPagos = "www.2";
      } else if (statusObj.status_op === "4/1250/5000") {
        updatedPagos = "www.3";
      } else if (statusObj.status_op === "6/1000/6000") {
        updatedPagos = "www.4";
      } else if (statusObj.status_op === "1/3200/3200") {
        updatedPagos = "www.5";
      } else if (statusObj.status_op === "2/2000/4000") {
        updatedPagos = "www.6";
      } else if (statusObj.status_op === "4/1000/4000") {
        updatedPagos = "www.7";
      } else if (statusObj.status_op === "6/800/4800") {
        updatedPagos = "www.8";
      }

      setStatusObj({
        ...statusObj,
        pagos: {
          ...statusObj.pagos,
          link: updatedPagos,
        },
      });

      if (
        !updatedEmailApp ||
        updatedEmailApp === "-" ||
        updatedEmailApp === "" ||
        updatedEmailApp === "NaN"
      ) {
        saveEmailAppFunction(updatedPagos);
      } else {
        saveEmailAppFunction(updatedPagos);
      }
    } else {
      statusObj.pagos = {};
    }

    if (statusObj.status === "A pagar") {
      if (
        !updatedEmailApp ||
        updatedEmailApp === "-" ||
        updatedEmailApp === "" ||
        updatedEmailApp === "NaN"
      ) {
        saveEmailAppFunction(item.email);
      } else {
        saveEmailAppFunction(updatedEmailApp);
      }
    }

    setOpenChild(true);
    handleLlamadoVentaChange();
  };

  const handleClose = () => {
    setOpenChild(false);
  };

  const handleUpdate = () => {
    if (statusObj.status === "Agenda llamada") {
      statusObj.status = "Agenda llamada";
      statusObj.emailApp = item.emailApp;
      statusObj.llamada_venta = {
        dia_hora: llamadoVenta.diaHora,
        // contacto: statusObj.observaciones.hableCon,
        observaciones: llamadoVenta.observaciones,
        dateObject: {
          hora: llamadoVenta.hora,
          minutos: llamadoVenta.minutos,
          dia: llamadoVenta.dia,
          mes: llamadoVenta.mes,
          year: llamadoVenta.year,
        },
      };

      statusObj.observaciones = {
        ...statusObj.observaciones,
        tipoContacto: "Meet",
        dia_hora: llamadoVenta.diaHora,
        dateObject: {
          hora: llamadoVenta.hora,
          minutos: llamadoVenta.minutos,
          dia: llamadoVenta.dia,
          mes: llamadoVenta.mes,
          year: llamadoVenta.year,
        },
      };
    } else {
      statusObj.llamada_venta = {};
    }

    if (statusObj.status === "Rechazado") {
      statusObj.observaciones = {
        ...statusObj.observaciones,
        dia_hora: llamadoVenta.diaHora,
        status_op: statusObj.status_op,
        dateObject: {
          hora: llamadoVenta.hora,
          minutos: llamadoVenta.minutos,
          dia: llamadoVenta.dia,
          mes: llamadoVenta.mes,
          year: llamadoVenta.year,
        },
      };
    }

    let dataVendedor = {};
    if (statusObj.status === "No responde") {
      statusObj.observaciones = {
        ...statusObj.observaciones,
        status_op: item.llamados + 1,
      };

      dataVendedor = {
        _id: item._id,
        name: item.name,
        email: item.email,
        status: statusObj.status,
        status_op: statusObj.status_op,
        llamada_venta: statusObj.llamada_venta,
        province: item.province,
        category: item.category,
        telephone: item.telephone,
        emailApp: updatedEmailApp,
        url: item.url,
        instagram: item.instagram,
        level: item.level,
      };
    } else {
      // statusObj.status_op = "";
      dataVendedor = {
        _id: item._id,
        name: item.name,
        email: item.email,
        emailApp: updatedEmailApp,
        status: statusObj.status,
        status_op: statusObj.status_op,
        pagos: statusObj.pagos,
        llamada_venta: statusObj.llamada_venta,
        province: item.province,
        category: item.category,
        telephone: item.telephone,
        url: item.url,
        instagram: item.instagram,
        level: item.level,
      };
    }

    const dataLead = {
      status: statusObj.status,
      status_op: statusObj.status_op,
      linkActivado: false,
      pagos: statusObj.pagos,
      edicion: statusObj.edicion,
      emailApp: updatedEmailApp,
      llamados: item.llamados,
      llamada_venta: statusObj.llamada_venta,
    };

    const dataObservaciones = statusObj.observaciones;

    const dataUpdate = {
      dataObservaciones,
      dataLead,
      dataVendedor,
    };

    axios
      .put(`/lead/freelance/${item._id}`, dataUpdate)
      .then((response) => {
        // Si la respuesta es exitosa, redirige a otra página

        if (response.data.title) {
          updateLeads();
          setOpen(false);
        }
        SendLeadAlert();
      })
      .catch((error) => {
        // Si hay un error, muestra un mensaje de error
        SendErrorUpdateAlert();
      });
    setOpenChild(false);
    setOpen(false);
    if (statusObj.status === "Contratado") {
      openModalPagoFunction();
    }
    if (statusObj.status === "A pagar") {
      openModalPagoFunction();
    }
    statusObj.status = "";
  };

  const handleCancel = () => {
    cancelModal();
    setOpen(false);
    statusObj.status = "";
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleCancel}
        >
          Cerrar x
        </button>
        {!flagPago ||
        editEmail ||
        editInstagram ||
        editTelephone ||
        editEmailApp ||
        openTimeHour ||
        editContacto ? (
          <>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#202020] rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:[#424141] dark:text-gray-400 dark:border-gray-600"
              onClick={handleOpen}
              disabled={true}
            >
              Guardar Cambios
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-400 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleOpen}
            >
              Guardar Cambios
            </button>
          </>
        )}
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
            width: 500,
            borderRadius: 5,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center">
            Actualizar Lead?
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//************************************************************************************************ */
function IncidenceModal({
  setOpen,
  SendIncidenceAlert,
  statusObj,
  item,
  emailAddress,
  fullName,
  updateLeads,
}) {
  const [openIncidenceChild, setOpenIncidenceChild] = React.useState(false);
  const [observationIncidence, setObservationIncidence] = React.useState("");

  const handleChangeObservation = (event) => {
    const value = event.target.value;
    setObservationIncidence(value);
  };

  const handleClose = () => {
    setOpenIncidenceChild(false);
  };
  const confirmSendIncidence = () => {
    statusObj.level = "incidencia";

    const dataVendedor = {
      _id: item._id,
      name: item.name,
      email: item.email,
      status: statusObj.status,
      status_op: observationIncidence,
      llamada_venta: statusObj.llamada_venta,
      province: item.province,
      category: item.category,
      telephone: item.telephone,
      url: item.url,
      instagram: item.instagram,
      level: statusObj.level,
    };

    const dataLead = {
      status: statusObj.status,
      level: statusObj.level,
      status_op: observationIncidence,
      vendedor: emailAddress,
      vendedor_name: fullName,
      llamados: item.llamados,
      llamada_venta: statusObj.llamada_venta,
    };

    const dataUpdate = {
      dataLead,
      dataVendedor,
    };

    axios
      .put(`/lead/vendedor/${item._id}`, dataUpdate)
      .then((response) => {
        SendIncidenceAlert();
      })
      .catch((error) => {
        console.log("error al enviar la incidencia");
      });

    setOpen(false);
  };

  const sendIncidence = () => {
    setOpenIncidenceChild(true);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center">
        <CiWarning
          className="text-[#ffffff] p-0 text-[35px] font-bold cursor-pointer"
          onClick={sendIncidence}
        />
      </div>
      <Modal
        open={openIncidenceChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            borderRadius: "15px",
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center mb-5">
            Enviar incidencia?
          </h2>
          <textarea
            name="observation"
            value={observationIncidence}
            id=""
            cols="30"
            rows="5"
            placeholder="Observation"
            onChange={handleChangeObservation}
            className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={confirmSendIncidence}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
//************************************************************************************************ */
function intelligentInfo({ setOpen }) {
  const [openIntelligentInfo, setOpenIntelligentInfo] = React.useState(false);

  const handleClose = () => {
    setOpenIncidenceChild(false);
  };
  const confirmSendIncidence = () => {
    setOpen(false);

    SendIncidenceAlert();
  };

  const sendIncidence = () => {
    setOpenIncidenceChild(true);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center">
        <CiWarning
          className="text-[#ffffff] p-0 text-[35px] font-bold cursor-pointer"
          onClick={sendIncidence}
        />
      </div>
      <Modal
        open={openIncidenceChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center mb-5">
            Enviar Incidencia?
          </h2>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Observation"
            className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={confirmSendIncidence}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
//************************************************************************************************ */
function ConfirmacionEdicion({ handleConfirmEdit, id, emailValidator }) {
  const [openConfirmacionEdicion, setConfirmacionEdicion] =
    React.useState(false);

  const handleClose = () => {
    setConfirmacionEdicion(false);
  };

  const handleOpen = () => {
    setConfirmacionEdicion(true);
  };

  const handleCancel = () => {
    setConfirmacionEdicion(false);
    statusObj.status = "";
  };
  const handleUpdate = () => {
    handleConfirmEdit(id);
    setConfirmacionEdicion(false);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        {emailValidator ? (
          <BsCheck
            onClick={handleOpen}
            className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-[#5cf73d] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-[#5cf73d] dark:hover:bg-gray-700 "
          />
        ) : (
          <>
            <BsCheck className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-[#f73d3d] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-[#f73d3d] dark:hover:bg-gray-700 " />
            <p className="absolute whitespace-nowrap text-red-600 -left-64 -bottom-7">
              email invalido
            </p>
          </>
        )}
      </div>
      <Modal
        open={openConfirmacionEdicion}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            borderRadius: 5,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center">
            Quiéres Confirmar la edición?
          </h2>
          <div className="flex justify-around items-center m-5 mt-10">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Si
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
//************************************************************************************************ */

export default function NestedModal({
  item,
  SendLeadAlert,
  SendIncidenceAlert,
  SendErrorUpdateAlert,
  updateLeads,
  emailAddress,
  fullName,
  cancelModal,
  saveEmailAppFunction,
  openModalPagoFunction,
}) {
  const [open, setOpen] = React.useState(false);
  const [dateHour, setDateHour] = React.useState({});
  const [openTimeHour, setOpenTimeHour] = React.useState(false);
  const [openPagoSelect, setOpenPagoSelect] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);
  const [openAlertErrorCuotas, setOpenAlertErrorCuotas] = React.useState(false);
  const [flagPago, setFlagPago] = React.useState(true);

  const [editEmail, setEditEmail] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState(item.email);
  const [updatedEmail, setUpdatedEmail] = React.useState(item.email);

  const [editInstagram, setEditInstagram] = React.useState(false);
  const [inputInstagram, setInputInstagram] = React.useState(item.instagram);
  const [updatedInstagram, setUpdatedInstagram] = React.useState(
    item.instagram
  );

  const [editTelephone, setEditTelephone] = React.useState(false);
  const [inputTelephone, setInputTelephone] = React.useState(item.telephone);
  const [updatedTelephone, setUpdatedTelephone] = React.useState(
    item.telephone
  );

  const [editEmailApp, setEditEmailApp] = React.useState(false);
  const [inputEmailApp, setInputEmailApp] = React.useState(item.emailApp);
  const [updatedEmailApp, setUpdatedEmailApp] = React.useState(item.emailApp);

  const [editContacto, setEditContacto] = React.useState(false);
  const [inputContacto, setInputContacto] = React.useState(item.contacto);
  const [updatedContacto, setUpdatedContacto] = React.useState(item.contacto);

  const [emailValidator, setEmailValidator] = React.useState(false);

  const [statusObj, setStatusObj] = React.useState({
    status: item.status,
    emailApp: "",
    edicion: true,
    pagos: {},
    status_op: item.status_op,
    llamados: item.llamados,
    llamada_venta: {},
    observaciones: {
      tipoContacto: "",
      observacion: "",
      hableCon: "",
      agenda: "",
    },
  });

  const [llamadoVenta, setLlamadoVenta] = React.useState({
    dia: dateHour.$D,
    mes: dateHour.$M + 1,
    year: dateHour.$y,
    hora: dateHour.$D,
    minutos: dateHour.$m,
    diaHora: "",
  });

  useEffect(() => {
    setStatusObj({
      ...statusObj,
      status: item.status,
    });
  }, [setStatusObj]);
  useEffect(() => {
    setUpdatedEmail(inputEmail);
  }, [updatedEmail]);

  const handleOpen = () => {
    statusObj.observaciones.tipoContacto = "";
    statusObj.observaciones.observacion = "";
    setOpen(true);
  };
  const handleClose = () => {
    cancelModal();
    setOpen(false);
    statusObj.status = "";
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setOpenPagoSelect("");
    setOpenTimeHour(false);
    if (value === "Contratado") {
      setFlagPago(false);
    } else {
      setFlagPago(true);
    }
    //CHEQUEAR ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    statusObj.edicion = true;
    statusObj.pagos = {};
    if (value === "No responde" || value === "Sin contactar") {
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else if (value === "Agenda llamada") {
      llamadoVenta.observaciones = "";
      dateHour.$D = "";
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else {
      setStatusObj({ ...statusObj, [property]: value });
    }
  };
  const handleObservationChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setStatusObj({
      ...statusObj,
      observaciones: { ...statusObj.observaciones, [property]: value },
    });
  };

  const handleSelectChangeContratado = (event) => {
    setOpenTimeHour(false);
    const value = event.target.value;
    const property = event.target.name;
    setStatusObj({
      ...statusObj,
      pagos: {
        ...statusObj.pagos,
        [property]: value,
      },
    });
  };

  const formattedUpdate = () => {
    let fechaYear = "";
    let fechaMonth = "";
    let fechaDay = "";
    let timeHour = "";
    let timeMinute = "";
    for (let i = 0; i < item.updatedAt.length; i++) {
      if (i < 4) {
        fechaYear += item.updatedAt[i];
      } else if (i >= 5 && i < 7) {
        fechaMonth += item.updatedAt[i];
      } else if (i >= 8 && i < 10) {
        fechaDay += item.updatedAt[i];
      } else if (i >= 11 && i < 13) {
        timeHour += item.updatedAt[i];
      }
      if (i >= 13 && i < 19) {
        timeMinute += item.updatedAt[i];
      }
    }

    return (
      <p htmlFor="" className="text-white m-2">
        {`Día: ${fechaDay}/${fechaMonth}/${fechaYear} - Hora: ${
          timeHour - 3
        }${timeMinute}`}
      </p>
    );
  };

  const setDateTime = () => {
    setOpenTimeHour(!openTimeHour);
  };
  const closeDateHour = () => {
    setOpenTimeHour(false);
  };
  const changeTime = async (date) => {
    await setDateHour({ ...date });
  };
  const handleLlamadoVentaChange = (event) => {
    if (event) {
      const value = event.target.value;
      const property = event.target.name;
      setLlamadoVenta({
        ...llamadoVenta,
        [property]: value,
        diaHora: `${dateHour.$D}/${dateHour.$M + 1}/${dateHour.$y} - ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: dateHour.$M + 1,
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    } else {
      setLlamadoVenta({
        ...llamadoVenta,
        diaHora: `${dateHour.$D}/${dateHour.$M + 1}/${dateHour.$y} - ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: dateHour.$M + 1,
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    }
  };

  const SendEmailLeadAlert = (texto) => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  };
  const SendEmailLeadAlertError = (texto) => {
    setOpenAlertError(true);
    setTimeout(() => {
      setOpenAlertError(false);
    }, 3000);
  };
  const SendEmailLeadAlertErrorCuotas = (texto) => {
    setOpenAlertErrorCuotas(true);
    setTimeout(() => {
      setOpenAlertErrorCuotas(false);
    }, 3000);
  };

  const handleSelectPago = (e) => {
    setFlagPago(false);
    setOpenPagoSelect(e.target.value);
  };

  const handleUpdatePago = (e) => {
    if (
      e.target.value === "1/4000/4000" ||
      e.target.value === "2/2500/5000" ||
      e.target.value === "4/1250/5000" ||
      e.target.value === "6/1000/6000" ||
      e.target.value === "1/3200/3200" ||
      e.target.value === "2/2000/4000" ||
      e.target.value === "4/1000/4000" ||
      e.target.value === "6/800/4800"
    ) {
      setFlagPago(true);
    } else {
      setFlagPago(false);
    }

    const value = e.target.value.split("/");
    setStatusObj({
      ...statusObj,
      status_op: e.target.value,
      pagos: {
        ...statusObj.pagos,
        monto: Number(value[2]),
        valorCuota: Number(value[1]),
        cuotas: Number(value[0]),
        cuotasPagadas: 0,
      },
    });
  };

  // Email Validator FUNCTION
  const validatorEmailFunction = (email) => {
    setEmailValidator(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  const validatorEmailAppFunction = (email) => {
    setEmailValidator(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  //EDITAR DATOS EMAIL
  const handleEditEmail = () => {
    setEmailValidator(true);
    setEditEmail(!editEmail);
    setEditEmailApp(false);
    setEditInstagram(false);
    setEditTelephone(false);
    setEditContacto(false);
  };
  const handleChangeEmail = (event) => {
    const emailChecked = event.target.value.trim();
    setInputEmail(emailChecked);
    validatorEmailFunction(emailChecked);
  };
  const handleConfirmEditEmail = async (id) => {
    const body = { email: inputEmail };
    const response = await axios.put(`/lead/changeemail/${id}`, body);
    setUpdatedEmail(response.data.email);
    setEditEmail(false);
    SendEmailLeadAlert("Email");
  };

  //EDITAR DATOS Instagram
  const handleEditInstagram = () => {
    setEmailValidator(true);
    setEditInstagram(!editInstagram);
    setEditEmailApp(false);
    setEditEmail(false);
    setEditTelephone(false);
    setEditContacto(false);
  };
  const handleChangeInstagram = (event) => {
    setInputInstagram(event.target.value);
  };
  const handleConfirmEditInstagram = async (id) => {
    const body = { instagram: inputInstagram };
    const response = await axios.put(`/lead/changeemail/${id}`, body);
    setUpdatedInstagram(response.data.instagram);
    setEditInstagram(false);
    SendEmailLeadAlert("Instagram");
  };

  //EDITAR DATOS Phone
  const handleEditTelephone = () => {
    setEmailValidator(true);
    setEditTelephone(!editTelephone);
    setEditEmailApp(false);
    setEditEmail(false);
    setEditInstagram(false);
    setEditContacto(false);
  };
  const handleChangeTelephone = (event) => {
    setInputTelephone(event.target.value);
  };
  const handleConfirmEditTelephone = async (id) => {
    const body = { telephone: inputTelephone };
    const response = await axios.put(`/lead/changeemail/${id}`, body);
    setUpdatedTelephone(response.data.telephone);
    setEditTelephone(false);
    SendEmailLeadAlert("Phone");
  };
  //EDITAR DATOS EmailApp
  const handleEditEmailApp = () => {
    setEmailValidator(true);
    setEditEmailApp(!editEmailApp);
    setEditTelephone(false);
    setEditEmail(false);
    setEditInstagram(false);
    setEditContacto(false);
  };
  const handleChangeEmailApp = (event) => {
    const emailChecked = event.target.value.trim();
    setInputEmailApp(emailChecked);
    validatorEmailFunction(emailChecked);
  };

  const handleConfirmEditEmailApp = async (id) => {
    const body = { emailApp: inputEmailApp };
    const response = await axios.put(`/lead/changeemail/${id}`, body);
    setUpdatedEmailApp(response.data.emailApp);
    setEditEmailApp(false);
    SendEmailLeadAlert("Email App");
  };

  //EDITAR DATOS Contacto
  const handleEditContacto = () => {
    setEmailValidator(true);
    setEditContacto(!editContacto);
    setEditEmailApp(false);
    setEditTelephone(false);
    setEditEmail(false);
    setEditInstagram(false);
  };
  const handleChangeContacto = (event) => {
    setInputContacto(event.target.value);
  };
  const handleConfirmEditContacto = async (id) => {
    try {
      const body = { contacto: inputContacto };
      const response = await axios.put(`/lead/changeemail/${id}`, body);
      setUpdatedContacto(response.data.contacto);
      SendEmailLeadAlert("Contacto");
    } catch (error) {
      SendEmailLeadAlertError("Contacto");
    }
    setEditContacto(false);
  };

  const handleEdicionChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setStatusObj({
      ...statusObj,
      edicion: !statusObj.edicion,
    });
  };

  console.log(statusObj.edicion)
  return (
    <div className="">
      <div className="flex gap-4">
        <CiEdit
          className="bg-[#6254ff] text-1 text-white w-10 h-8 rounded-md cursor-pointer "
          onClick={handleOpen}
        />
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
          <div className="w-full flex justify-center items-center mt-2 mb-10">
            {openAlert && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="-top-20 absolute bg-[#44a044] pr-5 pl-3 py-5 rounded-md"
              >
                <label>✔ Cliente Actualizado!</label>
              </motion.div>
            )}
            {openAlert && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="-top-20 absolute bg-[#44a044] pr-5 pl-3 py-5 rounded-md"
              >
                <label className="text-white">✔ Cliente Actualizado!</label>
              </motion.div>
            )}
            {openAlertError && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="border-2 -top-20 absolute bg-[#000000] pr-5 pl-3 py-5 rounded-md"
              >
                <label className=" text-white">❌ Error al actualizar!</label>
              </motion.div>
            )}
            {openAlertErrorCuotas && (
              <motion.div
                initial={{ opacity: 0, x: "-20px" }}
                whileInView={{ x: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.6,
                }}
                className="border-2 -top-20 absolute bg-[#000000] pr-5 pl-3 py-5 rounded-md"
              >
                <label className=" text-white">
                  ❌ Valor Cuota menor de €200
                </label>
              </motion.div>
            )}
            <div className="w-full flex flex-col justify-center items-center">
              <h2 id="parent-modal-title" className="text-center text-white">
                {item.name}
              </h2>
              <div className="flex flex-col justify-center items-center mt-3">
                <div className="mt-3  flex  justify-between items-center">
                  {/* EDITAR DATOS Email-------------------------------------  */}
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar email lead
                    </p>
                    <CiMail
                      onClick={handleEditEmail}
                      className={
                        editEmail
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar instagram
                    </p>
                    <CiInstagram
                      onClick={handleEditInstagram}
                      className={
                        editInstagram
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar Teléfono
                    </p>
                    <AiOutlinePhone
                      onClick={handleEditTelephone}
                      className={
                        editTelephone
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar contacto
                    </p>
                    <AiOutlineUserAdd
                      onClick={handleEditContacto}
                      className={
                        editContacto
                          ? "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    />
                  </div>
                  <div className="relative h-fit w-fit group flex justify-center items-center">
                    <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
                      Editar email app
                    </p>
                    <p
                      onClick={handleEditEmailApp}
                      className={
                        editEmailApp
                          ? "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-blue-700 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-500"
                          : "flex items-center justify-center mx-3 border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      }
                    >
                      APP
                    </p>
                  </div>
                </div>
                <div className="">
                  {editEmail && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeEmail}
                        defaultValue={updatedEmail}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={!editEmail}
                        required
                      />
                      <p
                        onClick={handleEditEmail}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditEmail}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {/* EDITAR DATOS Instagram-------------------------------------  */}
                  {editInstagram && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeInstagram}
                        defaultValue={updatedInstagram}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={!editInstagram}
                        required
                      />
                      <p
                        onClick={handleEditInstagram}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditInstagram}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {/* EDITAR DATOS Phone-------------------------------------  */}
                  {editTelephone && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeTelephone}
                        defaultValue={updatedTelephone}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={!editTelephone}
                        required
                      />
                      <p
                        onClick={handleEditTelephone}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditTelephone}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {/* EDITAR DATOS EmailApp-------------------------------------  */}
                  {editEmailApp && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeEmailApp}
                        defaultValue={updatedEmailApp}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Agregar email App cliente"
                        disabled={!editEmailApp}
                        required
                      />
                      <p
                        onClick={handleEditEmailApp}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditEmailApp}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                  {editContacto && (
                    <div className="w-full flex justify-center items-center mt-5 gap-3">
                      <input
                        type="text"
                        name="contacto"
                        onChange={handleChangeContacto}
                        defaultValue={updatedContacto}
                        className=" bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Agregar nombre de contacto"
                        disabled={!editContacto}
                        required
                      />
                      <p
                        onClick={handleEditContacto}
                        className="flex justify-center items-center border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                      >
                        ❌
                      </p>
                      <ConfirmacionEdicion
                        handleConfirmEdit={handleConfirmEditContacto}
                        id={item._id}
                        emailValidator={emailValidator}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col absolute right-4 top-4">
              {/* <div className="bg-[#8d8b0c] text-[#e8e8e9] w-[40px] rounded-md h-9 text-[35px] drop-shadow-xl hover:bg-[#c94219] ">
                <IncidenceModal
                  setOpen={setOpen}
                  SendIncidenceAlert={SendIncidenceAlert}
                  setStatusObj={setStatusObj}
                  statusObj={statusObj}
                  item={item}
                  emailAddress={emailAddress}
                  fullName={fullName}
                  updateLeads={updateLeads}
                />
              </div> */}
            </div>
          </div>

          <div className=" h-fit flex items-center justify-start flex-col mb-10">
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Estado
              </label>
              {location.pathname === "/vendedores" ||
              location.pathname === "/ventas-dashboard" ? (
                <>
                  <select
                    onChange={handleSelectChange}
                    name="status"
                    defaultValue={statusObj.status}
                    id="select1"
                    className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {/* <option value="Sin contactar">Sin Contactar</option> */}
                    {/* <option value="Agenda llamada">En proceso</option> */}
                    <option value="Contactado">Contactado</option>
                    {/* <option value="Contratado">Contratado</option> */}
                    {/* <option value="Rechazado">Rechazado</option> */}
                    {/* <option value="No responde">No Responde</option> */}
                  </select>

                  {statusObj.status === "Rechazado" && (
                    <div className="flex flex-col justify-center items-center">
                      <label
                        htmlFor="Motivo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Motivo
                      </label>
                      <select
                        id="Motivo"
                        onChange={handleSelectChange}
                        name="status_op"
                        defaultValue={
                          statusObj.status_op ? statusObj.status_op : "default"
                        }
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled="disabled" value="default">
                          Elige uno...
                        </option>
                        <option value="En proceso">En proceso</option>
                        <option value="Agenda llamada">Agenda llamada</option>
                        {/* <option value="Contratando">Contratando</option> */}
                        <option value="A pagar">A pagar</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="No responde">Sin contestar</option>
                      </select>
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-start mt-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm text-center font-medium text-gray-900 dark:text-white "
                    >
                      Contacto
                    </label>
                    <select
                      onChange={handleObservationChange}
                      name="tipoContacto"
                      defaultValue="default"
                      id="select11"
                      className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled="disabled" value="default">
                        Tipo de Contacto
                      </option>
                      <option
                        className="text-justify"
                        name="Instagram"
                        value="Instagram"
                      >
                        Instagram
                      </option>
                      <option
                        className="text-justify"
                        name="Linkedin"
                        value="Linkedin"
                      >
                        Linkedin
                      </option>
                      <option
                        className="text-justify"
                        name="Whatsapp"
                        value="Whatsapp"
                      >
                        Whatsapp
                      </option>
                      <option
                        className="text-justify"
                        name="Llamada telefónica"
                        value="Llamada telefónica"
                      >
                        Llamada telefónica
                      </option>
                      <option
                        className="text-justify"
                        name="Email"
                        value="Email"
                      >
                        Email
                      </option>
                      <option className="text-justify" name="Otro" value="Otro">
                        Otro
                      </option>
                    </select>

                    <label
                      htmlFor="last_name"
                      className="mt-7 block text-sm text-center font-medium text-gray-900 dark:text-white "
                    >
                      Observaciones
                    </label>
                    {/* <div className="flex justify-center items-center"> */}
                    <textarea
                      onChange={handleObservationChange}
                      type="text"
                      id="last_name"
                      name="observacion"
                      // value={llamadoVenta.observaciones}
                      className="mt-3 bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                    {/* </div> */}
                  </div>
                </>
              ) : (
                <>
                  <select
                    onChange={handleSelectChange}
                    name="status"
                    defaultValue="default"
                    id="select1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled="disabled" value="default">
                      Elige uno...
                    </option>
                    <option value="En proceso">En proceso</option>
                    <option value="Agenda llamada">Agenda llamada</option>
                    {/* <option value="Contratando">Contratando</option> */}
                    <option value="A pagar">A pagar</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="No responde">Sin contestar</option>
                  </select>
                  <div className="flex flex-col items-center justify-start mt-3">
                    {statusObj.status === "A pagar" && (
                      <div className="flex justify-center items-center mt-5 mb-10 gap-7">
                        <label className="inline-flex items-center text-white text-14">
                          SIN EDICIÓN
                        </label>
                        <input
                          type="checkbox"
                          name="edicion"
                          onChange={handleEdicionChange}
                          className="form-checkbox h-5 w-5 text-blue-500 rounded"
                          value={statusObj.edicion}
                        />
                      </div>
                    )}
                    {statusObj.status === "Rechazado" && (
                      <div className="flex flex-col justify-center items-center">
                        <label
                          htmlFor="Motivo"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Motivo
                        </label>
                        <select
                          id="Motivo"
                          onChange={handleSelectChange}
                          name="status_op"
                          defaultValue={
                            statusObj.status_op
                              ? statusObj.status_op
                              : "default"
                          }
                          className="w-60 mt-3 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled="disabled" value="default">
                            Elige uno...
                          </option>
                          <option value="Falta de presupuesto">
                            Falta de presupuesto
                          </option>
                          <option value="Sin interes">Sin interes</option>
                          <option value="Otro servicio similar">
                            Otro servicio similar
                          </option>
                          <option value="Otros motivos">Otros motivos</option>
                        </select>
                      </div>
                    )}
                    {statusObj.status !== "Agenda llamada" && (
                      <>
                        <label
                          htmlFor="last_name"
                          className="block text-sm text-center font-medium text-gray-900 dark:text-white "
                        >
                          Contacto
                        </label>
                        <select
                          onChange={handleObservationChange}
                          name="tipoContacto"
                          defaultValue="default"
                          id="select11"
                          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled="disabled" value="default">
                            Tipo de Contacto
                          </option>
                          <option
                            className="text-justify"
                            name="Instagram"
                            value="Instagram"
                          >
                            Instagram
                          </option>
                          <option
                            className="text-justify"
                            name="Linkedin"
                            value="Linkedin"
                          >
                            Linkedin
                          </option>
                          <option
                            className="text-justify"
                            name="Whatsapp"
                            value="Whatsapp"
                          >
                            Whatsapp
                          </option>
                          <option
                            className="text-justify"
                            name="Llamada telefónica"
                            value="Llamada telefónica"
                          >
                            Llamada telefónica
                          </option>
                          <option
                            className="text-justify"
                            name="Email"
                            value="Email"
                          >
                            Email
                          </option>
                          <option
                            className="text-justify"
                            name="Otro"
                            value="Otro"
                          >
                            Otro
                          </option>
                        </select>
                      </>
                    )}
                    {/* <label
              htmlFor="last_name"
              className="block mt-8 text-sm text-center font-medium text-gray-900 dark:text-white"
              >
              Nombre del Contacto
              </label>
            <div className="mt-3 flex justify-center items-center">
              <input
                onChange={handleLlamadoVentaChange}
                type="text"
                id="last_name"
                name="contacto"
                className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                />
              </div> */}
                    <label
                      htmlFor="last_name"
                      className="mt-3 block text-sm text-center font-medium text-gray-900 dark:text-white "
                    >
                      Observaciones
                    </label>
                    {/* <div className="flex justify-center items-center"> */}
                    <textarea
                      onChange={handleObservationChange}
                      type="text"
                      id="last_name"
                      name="observacion"
                      // value={llamadoVenta.observaciones}
                      className="mt-3 bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                    {/* </div> */}
                  </div>
                </>
              )}
            </div>
            {/* {statusObj.status === "Rechazado" && (
              <div className="m-5">
                <label
                  htmlFor="Motivo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Motivo
                </label>
                <select
                  id="Motivo"
                  onChange={handleSelectChange}
                  name="status_op"
                  defaultValue={
                    statusObj.status_op ? statusObj.status_op : "default"
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled="disabled" value="default">
                    Elige uno...
                  </option>
                  <option value="Sin dinero">Sin Dinero</option>
                  <option value="Sin interes">Sin Interes</option>
                  <option value="Otro servicio">Otro Servicio</option>
                </select>
              </div>
            )} */}
            {/* {(item.status === "Sin contactar" ||
              item.status === "No responde") &&
              // statusObj.status === "Agenda llamada" && (
              statusObj.status === "" && (
                <div className="flex flex-col justify-center items-center mt-5 ">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                  >
                    Contacto
                  </label>
                  <div className="flex justify-center items-center">
                    <input
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="contacto"
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white mt-8"
                  >
                    Observaciones
                  </label>
                  <div className="flex justify-center items-center">
                    <textarea
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="observaciones"
                      value={llamadoVenta.observaciones}
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <input
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="status_op"
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white text-center dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={
                        dateHour.$D
                          ? `Dia: ${dateHour.$D}/${dateHour.$M}/${
                              dateHour.$y
                            } Hora: ${
                              dateHour.$H && String(dateHour.$H).length === 1
                                ? `0${dateHour.$H}`
                                : dateHour.$H
                            }:${
                              dateHour.$m && String(dateHour.$m).length === 1
                                ? `0${dateHour.$m}`
                                : dateHour.$m
                            }`
                          : "Fecha y Hora"
                      }
                      disabled
                      required
                    />
                    <a
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      href="https://calendly.com/event_types/user/me"
                      target="_blank"
                    >
                      Calendly
                    </a>

                    <CiEdit
                      onClick={setDateTime}
                      className="border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                    />
                  </div>
                </div>
              )} */}

            {statusObj.status === "Agenda llamada" && (
              <div className="flex flex-col justify-center items-center mt-8">
                <div className="flex items-center justify-center gap-2 mt-8">
                  <input
                    onChange={handleLlamadoVentaChange}
                    type="text"
                    id="last_name"
                    name="status_op"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white text-center dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      dateHour.$D
                        ? `Dia: ${dateHour.$D}/${dateHour.$M + 1}/${
                            dateHour.$y
                          } Hora: ${
                            dateHour.$H && String(dateHour.$H).length === 1
                              ? `0${dateHour.$H}`
                              : dateHour.$H
                          }:${
                            dateHour.$m && String(dateHour.$m).length === 1
                              ? `0${dateHour.$m}`
                              : dateHour.$m
                          }`
                        : "Fecha y Hora"
                    }
                    disabled
                    required
                  />

                  <a
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    href="https://calendly.com/event_types/user/me"
                    target="_blank"
                  >
                    Calendly
                  </a>
                  <CiEdit
                    onClick={setDateTime}
                    className="border-2 text-1 w-12 h-10 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                  />
                </div>
              </div>
            )}

            {item.llamados > 0 && statusObj.status === "No responde" && (
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center flex-col">
                  <p htmlFor="" className="text-white m-2">
                    {`Llamados: ${item.llamados}`}
                  </p>
                  {formattedUpdate()}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center absolute -right-80 top-0">
            {openTimeHour && (
              <ResponsiveDateTimePickers
                handleLlamadoVentaChange={handleLlamadoVentaChange}
                closeDateHour={closeDateHour}
                changeTime={changeTime}
                className={style.dateTime}
              />
            )}
          </div>

          <div className="">
            <ChildModal
              item={item}
              statusObj={statusObj}
              llamadoVenta={llamadoVenta}
              setOpen={setOpen}
              SendLeadAlert={SendLeadAlert}
              SendErrorUpdateAlert={SendErrorUpdateAlert}
              SendEmailLeadAlertError={SendEmailLeadAlertError}
              SendEmailLeadAlertErrorCuotas={SendEmailLeadAlertErrorCuotas}
              handleLlamadoVentaChange={handleLlamadoVentaChange}
              updateLeads={updateLeads}
              emailAddress={emailAddress}
              fullName={fullName}
              cancelModal={cancelModal}
              setStatusObj={setStatusObj}
              updatedEmailApp={updatedEmailApp}
              editEmail={editEmail}
              editInstagram={editInstagram}
              editTelephone={editTelephone}
              editEmailApp={editEmailApp}
              editContacto={editContacto}
              openModalPagoFunction={openModalPagoFunction}
              saveEmailAppFunction={saveEmailAppFunction}
              flagPago={flagPago}
              openTimeHour={openTimeHour}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
