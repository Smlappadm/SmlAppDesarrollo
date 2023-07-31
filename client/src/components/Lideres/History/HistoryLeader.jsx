import { Link } from "react-router-dom";
import style from "./HistoryLeader.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text, Title } from "@tremor/react";
import {
  CiMail,
  CiInstagram,
  CiPhone,
  CiWarning,
  CiGlobe,
} from "react-icons/ci";
import InputRunner from "./MaterialUi/InputRunner";
import ModalCient from "./MaterialUi/ModalClient";
import AddLead from "./MaterialUi/ModalAddLead";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterLevel,
  filterStatus,
  getLeadChecked,
  orderCategory,
  orderClients,
} from "../../../redux/actions";
import {
  IoGrid,
  IoLogoSnapchat,
  IoStatsChart,
  IoRocketOutline,
} from "react-icons/io5";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import axios from "axios";
import { motion } from "framer-motion";

export const LideresHistory = () => {
  const [data, setData] = useState([]);
  const { leaderDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeadChecked());
  }, [dispatch]);
  useEffect(() => {
    setData(leaderDashboard);
  }, [leaderDashboard]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(8);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const showData = data.filter((item) => {
    return (
      item.level !== "-" &&
      item.status !== "" &&
      item.corredor !== "" &&
      item.corredor !== "-" &&
      item.status !== "discard"
    );
  });
  const currentCard = showData.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [clientOrder, setClientOrder] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");
  const [filters, setFilters] = useState(false);

  const headerClient = () => {
    if (clientOrder === "ASC") {
      return "Cliente ⤴";
    } else if (clientOrder === "DES") {
      return "Cliente ⤵";
    } else {
      return "Cliente";
    }
  };
  const handleOrderByClient = () => {
    if (clientOrder === "ASC" || clientOrder === "") {
      setClientOrder("DES");
      setCategoryOrder("");
      dispatch(orderClients(clientOrder));
      setData(leaderDashboard);
    } else {
      setClientOrder("ASC");
      dispatch(orderClients(clientOrder));
      setData(leaderDashboard);
    }
    setCurrentPage(1);
  };
  const headerCategory = () => {
    if (categoryOrder === "ASC") {
      return "Profesion ⤴";
    } else if (categoryOrder === "DES") {
      return "Profesion ⤵";
    } else {
      return "Profesion";
    }
  };
  const handleOrderByCategory = () => {
    if (categoryOrder === "ASC" || categoryOrder === "") {
      setCategoryOrder("DES");
      setClientOrder("");
      dispatch(orderCategory(categoryOrder));
      setData(leaderDashboard);
    } else {
      setCategoryOrder("ASC");
      dispatch(orderCategory(categoryOrder));
      setData(leaderDashboard);
    }
    setCurrentPage(1);
  };
  const handlerFilter = () => {
    setFilters(!filters);
  };
  const [levelValue, setLevelValue] = useState("");
  const onChangeLevel = (value) => {
    setLevelValue(value);
    dispatch(filterLevel(value));
    setData(leaderDashboard);
    setCurrentPage(1);
  };
  const [statusValue, setStatusValue] = useState("");
  const onChangeStatus = (value) => {
    setStatusValue(value);
    dispatch(filterStatus(value));
    setData(leaderDashboard);
    setCurrentPage(1);
  };

  const [open, setOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const handleOpen = (item, index) => {
    setOpen(true);
    setModalItems(item);
  };
  const handleClose = () => setOpen(false);

  const downloadCSV = () => {
    const csv = Papa.unparse(leaderDashboard);

    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "leaderDashboard.csv");
    tempLink.click();

    const updateLeaderDashboard = async () => {
      const promises = leaderDashboard.map((lead) =>
        axios.put(`/lead/${lead._id}`, {
          descargadosLeader: true,
        })
      );

      await Promise.all(promises);
    };

    updateLeaderDashboard();
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Nav />
      <Card className="w-full h-full bg-[#222131] rounded-none p-5">
        <div className="flex justify-between mx-5 mb-10">
          <div className="flex gap-5">
            <Title className="font-bold text-[#e2e2e2] w-40 text-lg mx-5 mt-2">
              Historial Empleados
            </Title>

            <Link
              className="flex items-center justify-center gap-2"
              to={"/contratando/"}
            >
              <motion.div
                className="flex items-center gap-2 text-white"
                style={{ width: isHovered ? "fit-content" : "2rem" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ width: "2rem" }}
                animate={{ width: isHovered ? 150 : "2rem" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <IoGrid
                  className={`text-[2rem] text-[#418df0] ${
                    isHovered ? "hover:text-[#3570bd]" : ""
                  }`}
                />
                {isHovered && <motion.p>Seguimiento</motion.p>}
              </motion.div>
            </Link>
            <Link
              className="flex items-center justify-center gap-2"
              to={"/lideres-freelancer/"}
            >
              <IoLogoSnapchat className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Freelancer</p>
            </Link>
            <Link
              className="flex items-center justify-center gap-2"
              to={"/lideres-analytics"}
            >
              <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Analiticas</p>
            </Link>
            <Link
              className="flex items-center justify-center gap-2"
              to={"/lideres-incidences"}
            >
              <CiWarning className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Incidencias</p>
            </Link>
            <Link
              className="flex items-center justify-center gap-2"
              to={"/promociones"}
            >
              <IoRocketOutline className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Promociones</p>
            </Link>
          </div>

          <label>Leads chequeados: {showData.length}</label>

          <div className="flex gap-5">
            <Button variant="outlined" onClick={downloadCSV}>
              Descargar CSV
            </Button>
            <AddLead />
          </div>
        </div>
        <div>
          <div className="flex gap-5 mt-5 mb-5 justify-around items-center">
            <InputRunner />
          </div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handleOrderByClient()}>
                  <Text className="text-start w-28 p-0 text-white">
                    {headerClient()}
                  </Text>
                </button>
              </div>
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handleOrderByCategory()}>
                  <Text className="text-start w-28 p-0 text-white">
                    {headerCategory()}
                  </Text>
                </button>
              </div>
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handlerFilter("level")}>
                  <Text className="text-center w-6 p-0 text-white">LVL</Text>
                </button>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">IG</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Tel</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="pr-3 text-center text-white">Chequeado</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handlerFilter("sellers")}>
                  <Text className="text-start w-28 p-0 text-white">
                    Corredor
                  </Text>
                </button>
              </div>
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handlerFilter("sellers")}>
                  <Text className="text-start w-28 p-0 text-white">
                    Vendedor
                  </Text>
                </button>
              </div>
              <div className="flex justify-center items-center p-0">
                <button onClick={() => handlerFilter("status")}>
                  <Text className="text-center w-48 p-0 text-white">
                    Estado
                  </Text>
                </button>
              </div>
            </div>
          </div>

          <div>
            <ModalCient
              open={open}
              handleClose={handleClose}
              modalItems={modalItems}
            />
            {currentCard.length > 0 ? (
              currentCard.map((item, index) => (
                <div
                  key={item._id}
                  className="flex bg-[#39394b] text-gray-400 text-sm p-3 rounded-lg h-14 my-5"
                >
                  <div className="w-full flex justify-around items-center">
                    <button
                      className="w-full flex justify-around items-center"
                      onClick={(index) => handleOpen(item, index)}
                    >
                      <div className="flex justify-center items-center p-0 ">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className=" text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.name}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0 ">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.profesion}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        {item.level !== "incidencia" ? (
                          <div className="flex w-6 text-ellipsis justify-start items-center p-0">
                            <p className="bg-[#6254ff] text-[#ffffff] w-6 rounded flex items-center justify-center  ">
                              {item.level}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#6254ff] text-[#e8e8e9] w-6 rounded  flex items-center justify-center text-24  ">
                            <CiWarning className="text-[#fdfa3a] p-0  font-bold" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.url !== "-" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiGlobe className={style.mail} />
                              </div>
                              <Text>{item.url}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiGlobe className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.email !== "-" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiMail className={style.mail} />
                              </div>
                              <Text>{item.email}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiMail className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.instagram !== "" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiInstagram className={style.ig} />
                              </div>
                              <Text>{item.instagram}</Text>
                            </div>
                          ) : (
                            <div>
                              <CiInstagram className={style.notIg} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 ">
                        <div className="flex w-6 text-ellipsis justify-start items-center p-0 ">
                          {item.telephone !== "" ? (
                            <div className=" flex opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#ffffff] hover:w-fit hover:text-black z-111 hover:absolute">
                              <div>
                                <CiPhone className={style.mail} />
                              </div>
                              <p className="">{item.telephone}</p>
                            </div>
                          ) : (
                            <div>
                              <CiPhone className={style.notMail} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0">
                        <div className="w-24 text-ellipsis flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.updatedAt ? item.updatedAt.slice(0, 10) : "-"}
                          </Text>
                        </div>
                      </div>

                      <div className="flex justify-center items-center p-0 ">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.corredor_name ? item.corredor_name : "-"}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0 mr-2 ">
                        <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                          <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                            {item.vendedor_name
                              ? item.vendedor_name
                              : "Sin vendedor asignado"}
                          </Text>
                        </div>
                      </div>
                      <div className="flex justify-center items-center p-0">
                        {item.status === "Contratado" ? (
                          <Text className="bg-[#26af7f]  text-[#1f1e1e]   px-2 py-1.5 rounded-xl text-center w-48">
                            Contratado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Sin contactar" ? (
                          <Text className="bg-[#d0da3d]  text-black  px-2 py-1.5 rounded-xl text-center w-48">
                            Sin Contactar
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Agenda llamada" ? (
                          <Text className="bg-[#483dda]  text-black  px-2 py-1.5 rounded-xl text-center w-48">
                            Agenda llamada
                          </Text>
                        ) : (
                          ""
                        )}

                        {item.status === "Rechazado" ? (
                          <Text className="bg-[#ac4242] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Rechazado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "A pagar" ? (
                          <Text className="bg-[#e5fc18] text-[#000000] px-2 py-1.5 rounded-xl text-center w-48">
                            A pagar
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "No responde" ? (
                          <Text className="bg-[#2148b4] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            No responde
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "incidencia" ? (
                          <Text className="bg-[#fcd218] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            Incidencia
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Agendar 2do llamado" ? (
                          <Text className="bg-black text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                            2do Llamado
                          </Text>
                        ) : (
                          ""
                        )}
                        {item.status === "Contactado" ? (
                          <Text className="bg-[#219bac] text-black px-2 py-1.5 rounded-xl text-center w-48">
                            Contactado
                          </Text>
                        ) : (
                          ""
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex text- justify-center items-center h-screen">
                <h1>No se encuentran Leads con este filtro...</h1>
              </div>
            )}
          </div>
        </div>
        {showData.length > 8 ? (
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={showData}
            pages={pages}
            current={currentPage}
          />
        ) : null}
      </Card>
    </>
  );
};
