import style from "./AnalyticLeader.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text } from "@tremor/react";
import {
  CiMail,
  CiInstagram,
  CiPhone,
  CiWarning,
  CiGlobe,
} from "react-icons/ci";
import ModalCient from "./MaterialUi/ModalClient";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterLevel,
  filterStatus,
  getLeadDiscard,
  orderCategory,
  orderClients,
} from "../../../redux/actions";
import NavBar from "../NavBar/NavBar";

export const AnalyticLeader = () => {
  const [data, setData] = useState([]);
  const { leaderDiscard } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeadDiscard());
  }, [dispatch]);
  useEffect(() => {
    setData(leaderDiscard);
  }, [leaderDiscard]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const showData = data;
  const currentCard = showData.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [clientOrder, setClientOrder] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("");
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

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
  const handlerFilter = (filter) => {
    if (filter === "level") {
      setFilters({ level: true, runner: false, sellers: false, status: false });
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
      <Card className="w-full h-full bg-[#222131] rounded-none p-5 relative">
        <div className="flex justify-between items-center mx-5 mb-10 ">
          <div className="flex gap-5 h-[37px]">
            <NavBar />
          </div>
          <div className=" mx-36">
            <label>Leads descartados por el bot: {showData.length}</label>
          </div>
          <div className="h-[36.5px] w-[36.5px]"></div>
        </div>
        <div className="w-full">
          <div className="text-white text-14 font-thin">
            <div className="flex items-center justify-around p-3  ">
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 p-0 text-white">Cliente</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Profesión</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Nivel</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6 p-0 text-white">Web</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6  text-white">Mail</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6  text-white">Instagram</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-6  text-white">Telefono</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28  text-white">Corredor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-start w-28 text-white">Vendedor</Text>
              </div>
              <div className="flex justify-center items-center p-0">
                <Text className="text-center w-48  text-white">Estado</Text>
              </div>
            </div>
          </div>

          <div>
            <ModalCient
              open={open}
              handleClose={handleClose}
              name={modalItems.name}
              category={modalItems.category}
              level={modalItems.level}
              web={modalItems.url}
              email={modalItems.email}
              instagram={modalItems.instagram}
              telephone={modalItems.telephone}
              status={modalItems.status}
              city={modalItems.city}
              province={modalItems.province}
              corredor={modalItems.corredor}
              vendedor={modalItems.vendedor}
              op={modalItems.status_op}
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
                            <CiPhone className={style.notMail} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0 ">
                      <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                        <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.corredor_name ? item.corredor_name : "-"}
                        </Text>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0 mr-2">
                      <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                        <Text className="text-white rounded-full text-ellipsis  opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.vendedor_name
                            ? item.vendedor_name
                            : "Sin vendedor asignado"}
                        </Text>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-0">
                      <Text className="bg-black  text-white   px-2 py-1.5 rounded-xl text-center w-48">
                        DISCARD BOT
                      </Text>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showData.length > 10 ? (
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
