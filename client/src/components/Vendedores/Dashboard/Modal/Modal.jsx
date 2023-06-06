import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiWarning, CiEdit } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import ResponsiveDateTimePickers from "./ResponsiveDateTimePickers";

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
}) {
  const [openChild, setOpenChild] = React.useState(false);

  const handleOpen = () => {
    setOpenChild(true);
    handleLlamadoVentaChange();
  };
  const handleClose = () => {
    setOpenChild(false);
  };

  const handleUpdate = () => {
    if (
      statusObj.status === "Agendar 2do llamado" ||
      statusObj.status === "Agendar otro llamado"
    ) {
      statusObj.status = "Agendar 2do llamado";
      statusObj.status_op = llamadoVenta.diaHora;
      statusObj.llamada_venta = {
        dia_hora: llamadoVenta.diaHora,
        contacto: llamadoVenta.contacto,
        observaciones: llamadoVenta.observaciones,
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
      // statusObj.status_op = "";
      dataVendedor = {
        _id: item._id,
        name: item.name,
        status: statusObj.status,
        status_op: statusObj.status_op,
        llamada_venta: statusObj.llamada_venta,
        province: item.province,
        category: item.category,
        telephone: item.telephone,
        url: item.url,
        instagram: item.instagram,
        level: item.level,
      };
    } else {
      // statusObj.status_op = "";
      dataVendedor = {
        _id: item._id,
        name: item.name,
        status: statusObj.status,
        status_op: statusObj.status_op,
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
      // vendedor: emailAddress,
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

    console.log(llamadoVenta);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="flex justify-around items-center relative">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleCancel}
        >
          Close x
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleOpen}
        >
          Save Changes
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
            width: 500,
            backgroundColor: "#39394B",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h2 id="child-modal-title" className="text-white text-center">
            Update the lead?
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
              Yes
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
  const handleOpen = () => {
    // setOpenChild(true);
  };

  // const handleUpdate = () => {
  //   if (statusObj.status === "incidencia") {
  //     const dataVendedor = {
  //       _id: item._id,
  //       name: item.name,
  //       status: statusObj.status,
  //       status_op: statusObj.status_op,
  //       llamada_venta: statusObj.llamada_venta,
  //       province: item.province,
  //       category: item.category,
  //       telephone: item.telephone,
  //       url: item.url,
  //       instagram: item.instagram,
  //       level: item.level,
  //     };

  //     const dataLead = {
  //       status: statusObj.status,
  //       status_op: statusObj.status_op,
  //       vendedor: emailAddress,
  //       vendedor_name: fullName,
  //       llamados: item.llamados,
  //       llamada_venta: statusObj.llamada_venta,
  //     };

  //     const dataUpdate = {
  //       dataLead,
  //       dataVendedor,
  //     };
  //     // axios
  //     //   .put(`/lead/vendedor/${item._id}`, dataUpdate)
  //     //   .then((response) => {})
  //     //   .catch((error) => {
  //     //     console.log("error al enviar lña incidencia");
  //     //   });

  //   //  updateLeads();
  //   SendIncidenceAlert();
  //   }
  // };

  const handleClose = () => {
    setOpenIncidenceChild(false);
  };
  const confirmSendIncidence = () => {
    statusObj.status = "incidencia";
    // await setStatusObj({...statusObj, status: "incidencia"})

    const dataVendedor = {
      _id: item._id,
      name: item.name,
      status: statusObj.status,
      status_op: statusObj.status_op,
      llamada_venta: statusObj.llamada_venta,
      province: item.province,
      category: item.category,
      telephone: item.telephone,
      url: item.url,
      instagram: item.instagram,
      level: statusObj.status,
    };

    const dataLead = {
      status: statusObj.status,
      level: statusObj.status,
      status_op: statusObj.status_op,
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

    // SendIncidenceAlert();
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
            Send Incidence?
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
              Yes
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

  const handleOpen = () => {
    // setOpenChild(true);
  };
  const handleClose = () => {
    setOpenIncidenceChild(false);
  };
  const confirmSendIncidence = () => {
    // setOpenChild(false);
    setOpen(false);
    // SendLeadAlert();
    SendIncidenceAlert();
  };
  const handleCancel = () => {
    // setOpen(false);
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
            Send Incidence?
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
              Yes
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
}) {
  const [open, setOpen] = React.useState(false);
  const [dateHour, setDateHour] = React.useState({});
  const [openTimeHour, setOpenTimeHour] = React.useState(false);
  const [statusObj, setStatusObj] = React.useState({
    status: item.status,
    status_op: item.status_op,
    llamados: item.llamados,
    llamada_venta: {},
  });
  const [llamadoVenta, setLlamadoVenta] = React.useState({
    contacto: "",
    observaciones: "",
    dia: dateHour.$D,
    mes: (dateHour.$M + 1),
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (event) => {
    setOpenTimeHour(false);
    const value = event.target.value;
    const property = event.target.name;
    if (value === "No responde" || value === "Sin contactar") {
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else if (value === "Agendar 2do llamado") {
      setStatusObj({
        ...statusObj,
        [property]: value,
        status_op: "",
      });
    } else {
      setStatusObj({ ...statusObj, [property]: value });
    }
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
        {`Date: ${fechaDay}/${fechaMonth}/${fechaYear} - Hour: ${
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
        diaHora: `Dia: ${dateHour.$D}/${(dateHour.$M + 1)}/${dateHour.$y} Hora: ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: (dateHour.$M + 1),
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    } else {
      setLlamadoVenta({
        ...llamadoVenta,
        diaHora: `Dia: ${dateHour.$D}/${(dateHour.$M + 1)}/${dateHour.$y} Hora: ${
          dateHour.$H && String(dateHour.$H).length === 1
            ? `0${dateHour.$H}`
            : dateHour.$H
        }:${
          dateHour.$m && String(dateHour.$m).length === 1
            ? `0${dateHour.$m}`
            : dateHour.$m
        }`,
        dia: dateHour.$D,
        mes: (dateHour.$M + 1),
        year: dateHour.$y,
        hora: dateHour.$D,
        minutos: dateHour.$m,
      });
    }
  };

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
          <div className="w-full flex justify-center items-center mt-3 mb-10">
            <h2 id="parent-modal-title" className="text-center text-white">
              {item.name}
            </h2>
            <div className="flex flex-col absolute right-4 top-4">
              <div className="bg-[#8d8b0c] text-[#e8e8e9] w-[40px] rounded-md h-9 text-[35px] drop-shadow-xl hover:bg-[#c94219] ">
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
              </div>
            </div>
          </div>

          <div className=" h-fit flex items-center justify-start flex-col mb-10">
            <div className="">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              {item.status !== "Agendar 2do llamado" ? (
                <select
                  onChange={handleSelectChange}
                  name="status"
                  defaultValue={statusObj.status}
                  id="select1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* <option selected>Choose a country</option> */}
                  <option value="Sin contactar">Sin Contactar</option>
                  <option value="Agendar 2do llamado">
                    Agendar 2do llamado
                  </option>
                  <option value="Rechazado">Rechazado</option>
                  <option value="No responde">No Responde</option>
                </select>
              ) : (
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
                  {/* <option value="Agendar 2do llamado">Agendar 2do llamado</option> */}
                  <option value="Agendar otro llamado">
                    Agendar otro llamado
                  </option>
                  <option value="Contratado">Contratado</option>
                  <option value="Rechazado">Rechazado</option>
                  <option value="No responde">No Responde</option>
                </select>
              )}
            </div>
            {statusObj.status === "Rechazado" && (
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
                  {/* <option selected>Choose a country</option> */}
                  <option disabled="disabled" value="default">
                    Elige uno...
                  </option>
                  <option value="Sin dinero">Sin Dinero</option>
                  <option value="Sin interes">Sin Interes</option>
                  <option value="Otro servicio">Otro Servicio</option>
                  {/* <option value="Otro servicio">Sin respuesta - 3 llamados</option> */}
                  {/* <option value="DE">Germany</option> */}
                </select>
              </div>
            )}
            {(item.status === "Sin contactar" ||
              item.status === "No responde") &&
              statusObj.status === "Agendar 2do llamado" && (
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
                      // defaultValue={item.status_op}
                      value={llamadoVenta.contacto}
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // placeholder={item.email}
                      placeholder=""
                      // value="USD"
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
                      // value="USD"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center gap-7 mt-8">
                    <input
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="status_op"
                      // defaultValue={item.status_op}
                      // value={llamadoVenta.diaHora}
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
                    {/* {dateHour.$D ? (<label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                  >
                    {`Dia: ${dateHour.$D}/${dateHour.$M}/${dateHour.$y} Hora: ${
                      dateHour.$H && String(dateHour.$H).length === 1
                        ? `0${dateHour.$H}`
                        : dateHour.$H
                    }:${
                      dateHour.$m && String(dateHour.$m).length === 1
                        ? `0${dateHour.$m}`
                        : dateHour.$m
                    }`}
                  </label>) : (<label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                  >
                    Fecha y Hora
                  </label>)} */}
                    <button
                      type="button"
                      className="py-2 px-3  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={setDateTime}
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              )}
            {item.status === "Agendar 2do llamado" &&
              statusObj.status === "Agendar otro llamado" && (
                <div className="flex flex-col justify-center items-center mt-5 ">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white"
                  >
                    {/* {item.llamada_venta} */}
                  </label>
                  <div className="flex justify-center items-center">
                    <input
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="contacto"
                      // defaultValue={item.status_op}
                      value={llamadoVenta.contacto}
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      // placeholder={item.email}
                      placeholder=""
                      // value="USD"
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
                      // value="USD"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center gap-7 mt-8">
                    <input
                      onChange={handleLlamadoVentaChange}
                      type="text"
                      id="last_name"
                      name="status_op"
                      // defaultValue={item.status_op}
                      // value={llamadoVenta.diaHora}
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white text-center dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={
                        dateHour.$D
                          ? `Dia: ${dateHour.$D}/${(dateHour.$M+1)}/${
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

                    <button
                      type="button"
                      className="py-2 px-3  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={setDateTime}
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              )}
            {item.status === "Agendar 2do llamado" &&
              statusObj.status === "Contratado" && (
                <div className="flex items-center justify-center gap-7 mt-8">
                  <label
                    htmlFor="last_name"
                    className="  text-sm text-center font-medium text-gray-900 dark:text-white"
                  >
                    USD
                  </label>
                  <input
                    onChange={handleSelectChange}
                    type="text"
                    id="last_name"
                    name="status_op"
                    // defaultValue={item.status_op}

                    className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder={item.email}
                    placeholder=""
                    // value="USD"
                    required
                  />
                </div>
              )}
            {item.llamados > 0 && statusObj.status === "No responde" && (
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex justify-center items-center flex-col">
                  <p htmlFor="" className="text-white m-2">
                    {`Llamados: ${item.llamados}`}
                  </p>
                  {formattedUpdate()}
                </div>
              </div>
            )}
          </div>
          {/* <div className="flex justify-center items-center absolute -right-80 top-0">
            {openTimeHour && (
              <ResponsiveDateTimePickers
                closeDateHour={closeDateHour}
                changeTime={changeTime}
                className={style.dateTime}
                handleLlamadoVentaChange ={handleLlamadoVentaChange }
              />
            )}
          </div> */}

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
              handleLlamadoVentaChange={handleLlamadoVentaChange}
              updateLeads={updateLeads}
              emailAddress={emailAddress}
              fullName={fullName}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
