import style from "./VendedoresDashboard.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import {
  filterLevel,
  getLeadCheckedInactive5,
  getAllProfesion,
  getAllCountries,
} from "../../../redux/actions";
import Modal from "./Modal/Modal";
import ModalIntelligentInfo from "./Modal/ModalIntelligenceInfo";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHistory } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import SelectLevel from "./Select/SelectStatus";
import { useUser } from "@clerk/clerk-react";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import BasicButtons1 from "./Select/BasicButtons1";
import BasicButtons2 from "./Select/BasicButtons2";
import InputRunner from "./Select/InputRunner";
import Nav from "../../Nav/Nav";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import PagosInfo from "../../PagosInfo/PagosInfo";

const VendedoresDashboard = () => {
  const [data, setData] = useState([]);
  const { vendedoresDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [openModalPago, setOpenModalPago] = useState(false);
  const [saveEmailApp, setSaveEmailApp] = useState("");
  const user = useUser().user;
  const email = user?.emailAddresses[0]?.emailAddress;
  const fullName = user?.fullName;
  localStorage.setItem("email", email);
  let emailAddress = localStorage.getItem("email");

  const body = { name: fullName, email: emailAddress };

  const { allCountries } = useSelector((state) => state);
  const { allProfesion } = useSelector((state) => state);

  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");

  const notify = () => toast("Here is your toast.");

  useEffect(() => {
    dispatch(getAllProfesion());
    dispatch(getAllCountries());
    dispatch(getLeadCheckedInactive5(body, profesion, country, level));
  }, [dispatch, emailAddress]);

  useEffect(() => {
    setData(vendedoresDashboard);
  }, [vendedoresDashboard]);

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
    dispatch(getLeadCheckedInactive5(body, profesion, country, level));
  };

  const [levelValue, setLevelValue] = useState("");
  const onChangeLevel = (value) => {
    setLevelValue(value);
    dispatch(filterLevel(value));
    setData(vendedoresDashboard);
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

  const openEditMenu = (index, id) => {
    setEdit(true);
    setEditIndex(index);
  };
  const sendEdit = () => {
    setEdit(false);
  };
  const SendLeadAlert = () => {
    toast.success("✔ Lead Update!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(getLeadCheckedInactive5(body, profesion, country, level));
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

    dispatch(getLeadCheckedInactive5(body, profesion, country, level));
  };

  const funcionHorario = (horario) => {
    const fechaHoraISO = horario;

    const fechaHora = new Date(fechaHoraISO);

    const opciones = { hour12: false };

    const fechaHoraLocal = fechaHora.toLocaleString(undefined, opciones);

    return fechaHoraLocal;
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


  // const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   const { clientX, clientY } = event;
  //   setHoverPosition({ x: clientX, y: clientY });
  // };

  return (
    <>
      <Nav />
      <div className="relative flex flex-col justify-between items-center w-screen  z-0">
      {/* <div onMouseMove={handleMouseMove} style={{ position: 'relative', height: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          top: (hoverPosition.y + 40) + 'px',
          left: (hoverPosition.x + 20)+ 'px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '10px',
        }}
      >
       ---Usted esta en el pixel: {hoverPosition.x}px, {hoverPosition.y}px
      </div>
    </div>  */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className={style.divTitle}>
            {showCopiedMessage && (
              <p className="absolute top-2 left-5 w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4  bg-[#238d5b] hover:bg-[#3f437a] cursor-pointer">
                Copiado!
              </p>
            )}

            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0 }}
              className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2"
            >
              Dashboard
            </motion.h1>

            <div className="flex gap-7">
              <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-6 group-hover:block">
                Ingresa al Dashboard
              </p>
              <Link to={"/vendedores"}>
                <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link to={"/vendedores-ventas"}>
                <MdOutlineAttachMoney className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              <Link className="text-5xl" to={"/vendedores-history"}>
                <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
              {/* <Link className="text-5xl" to={"/vendedores-analytics"}>
                <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link> */}
            </div>
            {!openModalPago && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex gap-5 justify-center items-center ml-16"
              >
                <InputRunner
                  getLeadCheckedInactive5={getLeadCheckedInactive5}
                  body={body}
                />
              </motion.div>
            )}
          </div>
          {!openModalPago ? (
            <>
              {vendedoresDashboard.length ? (
                <motion.div
                  initial={{ opacity: 0, y: "40px" }}
                  whileInView={{ y: "20px", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className={style.table}
                >
                  <div className="flex justify-start items-center  mx-6">
                    <label className="text-start w-[15%] px-3">Nombre</label>
                    <label className="text-start w-[15%] px-3">Profesión</label>
                    <label className="text-start w-[10%] px-3">País</label>
                    <label className="text-center w-[5%] ">Email</label>
                    <label className="text-center w-[5%] ">Instagram</label>
                    <label className="text-center w-[10%] ">Teléfono</label>
                    <label className="text-center w-[10%]">Nivel</label>
                    <label className="text-center w-[20%] ">Estado</label>
                    <label className="text-start w-[10%] "></label>
                  </div>

                  <div className="">
                    {currentCard.map((item, index) => (
                      <div
                        key={item._id}
                        className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 min-h-14 rounded-lg"
                      >
                        <div className=" w-[15%] flex justify-start items-center  p-0 ">
                          <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.name}
                          </p>
                        </div>
                        <div className=" w-[15%] flex justify-start items-center p-0 ">
                          <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.profesion}
                          </p>
                        </div>

                        <div className=" w-[10%] flex justify-start items-center p-0">
                          <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.country}
                          </p>
                        </div>

                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.email !== "-" ? (
                            <div onClick={() => handleCopyClick(item.email)}>
                              <div className="cursor-pointer">
                                <CiMail className="text-[35px] text-[#418df0] z-0" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <CiMail className="text-[35px] text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[5%] flex justify-center items-center p-0">
                          {item.instagram ? (
                            <div>
                              <a
                                href={item.instagram}
                                target="_blank"
                                className="cursor-pointer"
                              >
                                <CiInstagram className="text-[35px] text-[#ff598b]" />
                              </a>
                            </div>
                          ) : (
                            <div>
                              <CiInstagram className="text-[35px] text-[#9eabbe]" />
                            </div>
                          )}
                        </div>
                        <div className=" w-[10%] flex justify-center items-center p-0 ">
                          <p
                            onClick={() => handleCopyClick(item.telephone)}
                            className="text-center w-44 p-1 cursor-pointer px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
                          >
                            {item.telephone}
                          </p>
                        </div>
                        <div className=" w-[10%] flex justify-center items-center p-0">
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
                        <div className=" w-[20%] flex justify-center items-start p-0">
                          {item.status === "Sin contactar" && (
                            <p className="bg-[#a9b231] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                              {item.status}
                            </p>
                          )}
                          {item.status === "No responde" && (
                            <div className="bg-[#2148b4] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl">
                              <p className="text-16">{item.status}</p>
                              <label className="text-[14px]">
                                {funcionHorario(item.updatedAt)}
                              </label>
                            </div>
                          )}
                        </div>
                        <div className=" w-[10%] flex justify-center items-start p-0  gap-3">
                          <ModalIntelligentInfo />
                          <Modal
                            item={item}
                            SendLeadAlert={SendLeadAlert}
                            SendIncidenceAlert={SendIncidenceAlert}
                            SendErrorUpdateAlert={SendErrorUpdateAlert}
                            emailAddress={body.email}
                            fullName={fullName}
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
            <div className=" flex flex-col justify-center items-center w-44 mt-56 gap-7">
              <button
                className=" -top-3 -right-14 bg-[#485d94] text-white hover:bg-[#294ba7] w-10 h-10 rounded-full text-24 my-5 "
                onClick={closeModalPago}
              >
                x
              </button>
              <p
                onClick={() =>
                  handleCopyClick(
                    `http://localhost:5173/pagos-sml?emailApp=${saveEmailApp}`
                  )
                }
                className=" w-52 text-[#fff] font-bold flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#474646] hover:bg-[#3f437a] cursor-pointer"
              >
                Link de Pago
              </p>
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

export default VendedoresDashboard;

{
  /* <div className="border-2 flex flex-col justify-center items-center w-full mt-24">
<button
  className="border-2 bg-[#3a5fc5] w-12 h-12 rounded-full text-24 my-5"
  onClick={closeModalPago}
>
  x
</button>
<Pagos />
</div> */
}
