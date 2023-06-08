import style from "./VentasDashboard.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  filterLevel,
  getLeadsLLamadaVenta,
} from "../../../redux/actions";
import Modal from "./Modal/Modal";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHistory } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import SelectLevel from "./SelectLevel";
import { useUser } from "@clerk/clerk-react";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";

import Nav from "../../Nav/Nav";

const VentasDashboard = () => {
  const [data, setData] = useState([]);
  const { vendedoresVentasDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showObservaciones, setShowObservaciones] = useState(false);
  const [observationMessage, setObservationMessage] = useState("false");
  const user = useUser().user;
  const email = user?.emailAddresses[0]?.emailAddress;
  const fullName = user?.fullName;

  localStorage.setItem("email", email);
  let emailAddress = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getLeadsLLamadaVenta(emailAddress));
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
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  //FILTER**********************
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

  const handlerFilter = (filter) => {
    if (filter === "level") {
      setFilters({ level: !filters.level, runner: false, sellers: false, status: false });
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
    if(!value){
      setFilters({...filters, level: !filters.level})
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
    dispatch(getLeadsLLamadaVenta(emailAddress));
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
    dispatch(getLeadsLLamadaVenta(emailAddress));
  };
  const updateLeads = () => {

  };

  const showObservacionesHandler = (observacion) => {
    setObservationMessage(observacion);
    setShowObservaciones(true);
  };
  const closeObservacionesHandler = () => {
    setShowObservaciones(false);
  };

  return (
    <>
      <Nav />

      <div className="flex flex-col justify-between items-center w-screen  z-0">
        {showCopiedMessage && (
          <p className="mt-2 p-3 bg-[#b9b9b978] text-white rounded-md absolute">
            Copiado al portapapeles
          </p>
        )}

        <div className="w-full flex flex-col justify-center items-center">
          <div className={style.divTitle}>
            <h1 className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2">
              Dashboard
            </h1>
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
              <Link className="text-5xl" to={"/vendedores-analytics"}>
                <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              </Link>
            </div>
            {filters.level === true ? (
              <SelectLevel onChange={onChangeLevel} value={levelValue} />
            ) : (
              ""
            )}
          </div>
          {vendedoresVentasDashboard.length > 0 ? (
            <table className={style.table}>
              <thead className="text-gray-400 text-14 font-thin">
                <tr className={style.tableRow}>
                  <th className="text-start">Nombre</th>
                  <th className="text-start">Sector</th>
                  <th className="text-start">País</th>
                  <th className="text-start">Email</th>
                  <th className="text-start">Instagram</th>
                  <th className="text-start">Phone</th>
                  <th className="text-start">
                    <button onClick={() => handlerFilter("level")}>
                      Nivel
                    </button>
                  </th>
                  <th className="text-start">Llamar</th>
                  <th className="text-start">Status</th>
                  <th className="text-start"></th>
                </tr>
              </thead>

              <tbody className="">
                {currentCard.map((item, index) => (
                  <tr key={index} className={style.tableCards}>
                    <td className="flex justify-start items-center  p-0 w-fit">
                      <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                        {item.name}
                      </p>
                    </td>
                    <td className="flex justify-start items-center p-0 w-fit">
                      <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                        {item.category}
                      </p>
                    </td>

                    <td className="flex justify-start items-center p-0 w-fit">
                      <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                        {item.province}
                      </p>
                    </td>

                    <td className="flex justify-center items-center p-0 w-fit">
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
                    </td>
                    <td className="flex justify-start items-center p-0 w-fit">
                      {showObservaciones && (
                        <div className="flex justify-start items-center max-w-lg absolute top-2 bg-[#4f4f62] text-white rounded-xl">
                          <p className=" p-3    ">
                            Observaciones: {observationMessage}
                          </p>
                          <button
                            onClick={closeObservacionesHandler}
                            className="border-2 text-white mx-3 text-18 pb-1 px-2 rounded-md"
                          >
                            x
                          </button>
                        </div>
                      )}
                      {item.instagram ? (
                        <div onClick={() => handleCopyClick(item.instagram)}>
                          <div className="cursor-pointer">
                            <CiInstagram className="text-[35px] mr-5 text-[#ff598b]" />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <CiInstagram className="text-[35px] mr-5 text-[#9eabbe]" />
                        </div>
                      )}
                    </td>
                    <td className="flex justify-start items-center p-0 w-fit">
                      <p
                        onClick={() => handleCopyClick(item.telephone)}
                        className="text-start w-44 p-1 cursor-pointer px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
                      >
                        {item.telephone}
                      </p>
                    </td>
                    <td className="flex justify-start items-center p-0 w-fit">
                      {item.level !== "incidencia" ? (
                        <p className="bg-[#6254ff] text-[#ffffff] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                          {item.level}
                        </p>
                      ) : (
                        <div className="bg-[#6254ff] text-[#e8e8e9] w-[40px] rounded h-10 flex items-center justify-center text-[35px] drop-shadow-xl">
                          <CiWarning className="text-[#fdfa3a] p-0 text-[35px] font-bold" />
                        </div>
                      )}
                    </td>
                    <td className="flex justify-start items-center p-0 w-fit">
                      <div className="w-52 h-11">
                        {item.llamada_venta.contacto ? (
                          <p className="w-64  rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                            {item.llamada_venta.contacto}
                          </p>
                        ) : (
                          <p className="w-64 rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                            Sin contacto
                          </p>
                        )}
                        <div className="flex justify-start items-center">
                          {item.llamada_venta.dia_hora[5] !== "u" ? (
                            <p className="w-fit rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              {item.llamada_venta.dia_hora}
                            </p>
                          ) : (
                            <p className="w-fit rounded-full text-ellipsis text-16 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 px-1">
                              Sin Día/Hora
                            </p>
                          )}
                        </div>
                      </div>
                      <AiOutlineInfoCircle
                        className="border-2  border-[#dddb6376] text-1 text-[#dddb63b0] w-8 h-8 rounded-md cursor-pointer "
                        onClick={() => {
                          showObservacionesHandler(
                            item.llamada_venta.observaciones
                          );
                        }}
                      />
                    </td>
                    <td className="flex justify-start items-start p-0 w-fit">
                      {item.status === "Sin contactar" && (
                        <p className="bg-[#ff69b4] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                          {item.status}
                        </p>
                      )}
                      {item.status === "Agendar 2do llamado" && (
                        // <p className="bg-[#b4215e] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                        <p className="bg-[#21b46f] w-52 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                          {/* bg-[#ff69b4]  */}
                          {item.status}
                        </p>
                      )}
                    </td>
                    <td className="flex justify-start items-start p-0 w-fit">
                      <Modal
                        item={item}
                        SendLeadAlert={SendLeadAlert}
                        SendIncidenceAlert={SendIncidenceAlert}
                        SendErrorUpdateAlert={SendErrorUpdateAlert}
                        updateLeads={updateLeads}
                        emailAddress={emailAddress}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <h1>LEADS NOT FOUND...</h1>
            </div>
          )}
        </div>
        {data.length > 10 && (
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
