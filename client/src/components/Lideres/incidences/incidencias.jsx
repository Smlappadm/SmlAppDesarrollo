import { Link } from "react-router-dom";
import style from "./incidencias.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text, Title } from "@tremor/react";
import { CiMail, CiInstagram, CiPhone, CiWarning } from "react-icons/ci";
import ModalCient from "./MaterialUi/ModalClient";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadChecked,
  orderClients,
  orderCategory,
} from "../../../redux/actions";
import { IoGrid, IoStatsChart, IoPeople } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

//
const Incidences = () => {
  const [data, setData] = useState([]);
  const { leaderDashboard } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getLeadChecked());
  };

  const filterData = () => {
    const filteredData = leaderDashboard.filter(
      (item) => item.level === "incidencia"
    );
    setData(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [leaderDashboard]);

  const handleState = () => {
    fetchData();
    filterData();
  };

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [clientOrder, setClientOrder] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");

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

  return (
    <>
      <Nav />
      <Card className="w-full h-full bg-[#222131] rounded-none p-5">
        <div className="flex justify-between items-center mx-5 mb-0">
          <div className="flex gap-5 ">
            <Title className={style.title}>Incidences</Title>
            <Link to={"/lideres/"}>
              <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
            <Link className="text-5xl" to={"/lideres-analytics"}>
              <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
            <Link className="text-5xl" to={"/lideres-incidences"}>
              <CiWarning className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
            </Link>
          </div>
          <div className="h-[36.5px] w-[36.5px]"></div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin ">
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
                <Text className="text-center w-6 p-0 text-white">Nivel</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">
                  Instagram
                </Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Telefono</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Corredor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Vendedor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-48 p-0 text-white">Estado</Text>
              </div>
            </div>
          </div>

          <div>
            <ModalCient
              updateParentState={handleState}
              open={open}
              handleClose={handleClose}
              _id={modalItems._id}
              name={modalItems.name}
              category={modalItems.category}
              level={modalItems.level}
              email={modalItems.email}
              instagram={modalItems.instagram}
              telephone={modalItems.telephone}
              status={modalItems.status}
              city={modalItems.city}
              province={modalItems.province}
              web={modalItems.url}
              corredor={modalItems.corredor}
              vendedor={modalItems.vendedor}
              observacion={modalItems.status_op}
            />
            {currentCard.map((item, index) => (
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
                          {item.category}
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
                            <CiPhone className={style.not} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0 ">
                      <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                        <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.corredor ? item.corredor : "-"}
                        </Text>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0 ">
                      <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                        <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.vendedor ? item.vendedor : "-"}
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
                        <Text className="bg-[#d0da3d]  text-[#e0dfdf]   px-2 py-1.5 rounded-xl text-center w-48">
                          Sin Contactar
                        </Text>
                      ) : (
                        ""
                      )}

                      {item.status === "Rechazado" ? (
                        <Text className="bg-[#b44f82] text-[#e0dfdf] px-2 py-1.5 rounded-xl text-center w-48">
                          Rechazado
                        </Text>
                      ) : (
                        ""
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PaginationOutlined
          pageStyle={pageStyle}
          setPageStyle={setPageStyle}
          cardXPage={cardXPage}
          data={data}
          pages={pages}
          current={currentPage}
        />
      </Card>
    </>
  );
};
export default Incidences;
