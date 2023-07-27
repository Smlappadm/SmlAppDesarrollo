import style from "./VentasDashboard.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { filterLevel, getLeadsLLamadaVenta } from "../../../redux/actions";
import Modal from "./Modal/Modal";
import ModalObservaciones from "./Modal/ModalObservaciones";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHistory, FaWhatsapp } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import SelectLevel from "./Select/SelectStatus";
import { useUser } from "@clerk/clerk-react";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import InputRunner from "./Select/InputRunnerVentas";
import { motion } from "framer-motion";
import Nav from "../../Nav/Nav";

const VentasDashboard = () => {
  const [data, setData] = useState([]);
  const { vendedoresVentasDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showObservaciones, setShowObservaciones] = useState(false);
  const [observationMessage, setObservationMessage] = useState("false");
  const [openModalPago, setOpenModalPago] = useState(false);
  const [saveEmailApp, setSaveEmailApp] = useState("");

  const user = useUser().user;
  const email = user?.emailAddresses[0]?.emailAddress;
  const fullName = user?.fullName;
  localStorage.setItem("email", email);
  let emailAddress = localStorage.getItem("email");
  // const body = { name: fullName, email: emailAddress };
  const body = { email: emailAddress };

  useEffect(() => {
    dispatch(getLeadsLLamadaVenta(body));
  }, [dispatch, emailAddress]);

  useEffect(() => {
    setData(vendedoresVentasDashboard);
  }, [vendedoresVentasDashboard, setData]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const cancelModal = () => {
    dispatch(getLeadsLLamadaVenta(body));
  };

  //FILTER**********************
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

  const handlerFilter = (filter) => {
    if (filter === "level") {
      setFilters({
        level: !filters.level,
        runner: false,
        sellers: false,
        status: false,
      });
    } else if (filter === "runner") {
      setFilters({ level: false, runner: true, sellers: false, status: false });
    } else if (filter === "sellers") {
      setFilters({ level: false, runner: false, sellers: true, status: false });
    } else {
      setFilters({ level: false, runner: false, sellers: false, status: true });
    }
  };

  const [levelValue, setLevelValue] = useState("");
  const onChangeLevel = (value) => {
    setLevelValue(value);
    dispatch(filterLevel(value));
    setData(vendedoresVentasDashboard);
    setCurrentPage(1);
    if (!value) {
      setFilters({ ...filters, level: !filters.level });
    }
  };
  //********************************* */

  const handleCopyClick = (copyToProps) => {
    navigator.clipboard
      .writeText(copyToProps)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      })
      .catch((err) => alert(`Error al copiar: ${err}`));
  };

  const SendLeadAlert = () => {
    toast.success("✔ Cliente Actualizado!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(getLeadsLLamadaVenta(body));
    pages(1);
  };
  const SendErrorUpdateAlert = () => {
    toast.error("The lead could not be updated!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const SendIncidenceAlert = () => {
    toast.warn("incidence sent!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(getLeadsLLamadaVenta(body));
  };

  const showObservacionesHandler = (observacion) => {
    setObservationMessage(observacion);
    setShowObservaciones(true);
  };
  const closeObservacionesHandler = () => {
    setShowObservaciones(false);
  };

  const openModalPagoFunction = () => {
    setOpenModalPago(true);
  };
  const closeModalPago = () => {
    setOpenModalPago(false);
  };

  const saveEmailAppFunction = (email) => {
    setSaveEmailApp(email);
  };

  const funcionHorario = (horario) => {
    const fechaHoraISO = horario;

    const fechaHora = new Date(fechaHoraISO);

    const opciones = { hour12: false };

    const fechaHoraLocal = fechaHora.toLocaleString(undefined, opciones);

    return fechaHoraLocal;
  };

  return (
    <>
      <Nav />

      <div className="relative flex flex-col justify-between items-center w-screen  z-0">
        {showCopiedMessage && (
          <p className="mt-2 p-3 bg-[#b9b9b978] text-white rounded-md absolute">
            Copiado al portapapeles
          </p>
        )}
        {showObservaciones && (
          <div className="flex justify-start items-center max-w-lg absolute top-2 bg-[#4f4f62] text-white rounded-xl">
            <p className=" p-3    ">Observaciones: {observationMessage}</p>
            <button
              onClick={closeObservacionesHandler}
              className="border-2 text-white mx-3 text-18  px-2 rounded-md"
            >
              x
            </button>
          </div>
        )}

        <div className="w-full flex flex-col justify-center items-center">
          <div className={style.divTitle}>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0 }}
              className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2"
            >
              Seguimiento
            </motion.h1>
            <div className="flex gap-7">
              <Link to={"/vendedores"}>
                <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link to={"/vendedores-ventas"}>
                <MdOutlineAttachMoney className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/vendedores-history"}>
                <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
            </div>
            {filters.level === true ? (
              <SelectLevel onChange={onChangeLevel} value={levelValue} />
            ) : (
              ""
            )}
            {!openModalPago && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex gap-5 justify-center items-center ml-16"
              >
                <InputRunner
                  getLeadCheckedInactive5={getLeadsLLamadaVenta}
                  body={body}
                  emailAddress={emailAddress}
                />
              </motion.div>
            )}
          </div>
          {!openModalPago ? (
            <>
              {vendedoresVentasDashboard.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: "30px" }}
                  whileInView={{ y: "10px", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className={style.table}
                >
                  <div className="flex justify-start items-center  mx-6">
                    <label className=" text-start w-[15%] px-3">Nombre</label>
                    <label className=" text-start w-[11%] px-3">
                      Profesión
                    </label>
                    <label className=" text-start w-[9%] px-3">País</label>
                    <label className=" text-center w-[5%] ">Email</label>
                    <label className=" text-center w-[5%] ">Instagram</label>
                    <label className=" text-center w-[15%] ">Teléfono</label>
                    <button
                      className=" text-center w-[5%]"
                      onClick={() => handlerFilter("level")}
                    >
                      Nivel
                    </button>
                    <label className=" text-center w-[13%] ">Agenda</label>
                    <label className=" text-center w-[15%] ">Estado</label>
                    <label className=" text-center w-[9%] "></label>
                  </div>
                  <div className="">
                    {currentCard.map((item, index) => (
                      <div
                        key={item._id}
                        className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 h-11 rounded-lg"
                      >
                        <div className=" w-[15%] flex justify-start items-center  p-0 ">
                          <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.name}
                          </p>
                        </div>
                        <div className=" w-[11%] flex justify-start items-center p-0 ">
                          <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.profesion}
                          </p>
                        </div>

                        <div className=" w-[9%] flex justify-start items-center p-0">
                          <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.country}
                          </p>
                        </div>

                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.email !== "-" ? (
                            <div onClick={() => handleCopyClick(item.email)}>
                              <div className="cursor-pointer">
                                <CiMail className="text-[35px] mr-5 text-[#418df0] z-0" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CiMail className="text-[35px] mr-5 text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.instagram ? (
                            <div
                              onClick={() => handleCopyClick(item.instagram)}
                            >
                              <div className="cursor-pointer">
                                <CiInstagram className="text-[35px] mr-5 text-[#ff598b]" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CiInstagram className="text-[35px] mr-5 text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[15%] flex justify-center items-center p-0 ">
                          <div className="flex w-44 justify-start items-center gap-2 relative">
                            <p
                              onClick={() => handleCopyClick(item.telephone)}
                              className="text-start w-44 p-1 cursor-pointer  px-3 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 "
                            >
                              {item.telephone}
                            </p>
                          </div>
                          <a
                            href={`http://wa.me/${item.telephone.replace(
                              /\s+/g,
                              ""
                            )}`}
                            target="blanck"
                          >
                            <FaWhatsapp className="text-[30px] block mr-5 text-[#9eabbe] cursor-pointer hover:text-green-500 hover:text-[33px]" />
                          </a>
                        </div>
                        <div className=" w-[5%] flex justify-center items-start p-0">
                          {item.level !== "incidencia" ? (
                            <p className="bg-[#6254ff] text-[#ffffff] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                              {item.level}
                            </p>
                          ) : (
                            <div className="bg-[#6254ff] text-[#e8e8e9] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                              <CiWarning className="text-[#fdfa3a] p-0 text-[35px] font-bold" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[13%] flex flex-col justify-center items-center p-0">
                          {/* <h1>sss</h1>
                          {item.llamada_venta.contacto ? (
                            <p className="w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              {item.llamada_venta.contacto}
                            </p>
                          ) : (
                            <p className="w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              Sin contacto
                            </p>
                          )} */}

                          {/* {item.observaciones_ventas.contacto ? (
                            <p className="w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              {item.observaciones_ventas.contacto}
                            </p>
                          ) : (
                            <p className="w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              Sin contacto
                            </p>
                          )} */}

                          {/* <div className=" flex justify-center items-center">
                            {typeof item.llamada_venta.dia_hora !==
                              "undefined" &&
                            item.llamada_venta?.dia_hora[5] !== "u" ? (
                              <p className="w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                                {item.llamada_venta.dia_hora}
                              </p>
                            ) : (
                              <p className="w-fit rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                                Sin Día/Hora
                              </p>
                            )}
                          </div> */}
                          <div className=" flex justify-center items-center">
                            {item.status === "Agenda llamada" &&
                              item.llamada_venta?.dia_hora[0] !== "u" && (
                                <p className=" w-fit rounded-full text-ellipsis text-14 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                                  {item.llamada_venta.dia_hora}
                                </p>
                              )}
                            {item.status === "Agenda llamada" &&
                              item.llamada_venta?.dia_hora[0] === "u" && (
                                <p className="w-fit rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                                  Sin Día/Hora
                                </p>
                              )}
                          </div>

                          {item.status === "No responde" && (
                            // <div className="bg-[#2148b4] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl">
                            <label className="text-[14px]">
                              {funcionHorario(item.updatedAt).slice(0, -3)}
                            </label>
                            // </div>
                          )}
                          {/* <AiOutlineInfoCircle
                            className="border-2  border-[#dddb6376] text-1 text-[#dddb63b0] w-8 h-8 rounded-md cursor-pointer "
                            onClick={() => {
                              showObservacionesHandler(
                                item.llamada_venta.observaciones
                              );
                            }}
                          /> */}
                        </div>
                        <div className=" w-[15%] flex justify-center items-start p-0">
                          {item.status === "Contratado" && (
                            <p className="bg-[#26af7f] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                              Contratado
                            </p>
                          )}
                          {item.status === "No responde" && (
                            <p className="bg-[#2148b4] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                              Sin contestar
                            </p>
                          )}
                          {item.status === "Rechazado" && (
                            <p className="bg-[#ac4242] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                              Rechazado
                            </p>
                          )}
                          {item.status === "Agenda llamada" && (
                            <div className="bg-[#5bac42] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                              <p>Agenda llamada</p>
                            </div>
                          )}
                          {item.status === "Contactado" && (
                            <div className="bg-[#42ac9a] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                              <p>Contactado</p>
                            </div>
                          )}
                          {item.level === "incidencia" && (
                            <p className="bg-[#e5fc18] w-44 h-11 flex justify-center items-center text-black rounded-3xl text-18">
                              Incidencia
                            </p>
                          )}
                        </div>
                        <div className=" w-[9%] flex justify-center items-start p-0 gap-3">
                          <ModalObservaciones item={item} />
                          <Modal
                            item={item}
                            SendLeadAlert={SendLeadAlert}
                            SendIncidenceAlert={SendIncidenceAlert}
                            SendErrorUpdateAlert={SendErrorUpdateAlert}
                            emailAddress={emailAddress}
                            cancelModal={cancelModal}
                            openModalPagoFunction={openModalPagoFunction}
                            saveEmailAppFunction={saveEmailAppFunction}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center w-full h-screen">
                  <h1>No hay Leads disponibles</h1>
                </div>
              )}
            </>
          ) : (
            <div className=" flex flex-col justify-center items-center w-44 mt-40 gap-7">
              <button
                className="border-2 bg-[#485d94] text-white hover:bg-[#294ba7] w-10 h-10 rounded-full text-23 my-2 "
                onClick={closeModalPago}
              >
                x
              </button>
              {window.location.hostname.includes("localhost") && (
                <>
                  <p className="border-2 p-3">
                    `http://localhost:5173/promocion-pagos?emailApp=$
                    {saveEmailApp}`
                  </p>
                  <p
                    onClick={() =>
                      handleCopyClick(
                        `http://localhost:5173/promocion-pagos?emailApp=${saveEmailApp}`
                      )
                    }
                    className=" w-48 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                  >
                    Link de Pago
                  </p>
                </>
              )}
              {window.location.hostname.includes("sml-app.vercel") && (
                <>
                  <p className="border-2 p-3">
                    `https://sml-app.vercel.app/promocion-pagos?emailApp=$
                    {saveEmailApp}`
                  </p>
                  <p
                    onClick={() =>
                      handleCopyClick(
                        `https://sml-app.vercel.app/promocion-pagos?emailApp=${saveEmailApp}`
                      )
                    }
                    className=" w-48 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                  >
                    Link de Pago
                  </p>
                </>
              )}
              {window.location.hostname.includes("sml-app.com") && (
                <>
                  <p className="border-2 p-3">
                    `https://sml-app.com/promocion-pagos?emailApp=$
                    {saveEmailApp}`
                  </p>
                  <p
                    onClick={() =>
                      handleCopyClick(
                        `https://sml-app.com/promocion-pagos?emailApp=${saveEmailApp}`
                      )
                    }
                    className=" w-48 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
                  >
                    Link de Pago
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        {data.length > 10 && !openModalPago && (
          <div className="mb-5">
            <PaginationOutlined
              pageStyle={pageStyle}
              setPageStyle={setPageStyle}
              cardXPage={cardXPage}
              data={data}
              pages={pages}
              current={currentPage}
            />
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default VentasDashboard;
