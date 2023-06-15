import style from "./VendedoresHistory.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { filterLevel, getVendedorAllLeads } from "../../../redux/actions";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import { MdOutlineAttachMoney } from "react-icons/md";
import SelectLevel from "../Dashboard/Select/SelectLevel";
import SelectStatus from "../Dashboard/Select/SelectStatus";

import Nav from "../../Nav/Nav";

const VendedoresHistory = () => {
  const [data, setData] = useState([]);
  const { vendedorAllLeadsHistory } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const user = useUser().user;
  const email = user?.emailAddresses[0].emailAddress;
  const [openFilterName, setOpenFilterName] = useState(false);
  const [openFilterSector, setOpenFilterSector] = useState(false);
  const [openFilterPais, setOpenFilterPais] = useState(false);
  const [openFilterStatus, setOpenFilterStatus] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [filterPais, setFilterPais] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(getVendedorAllLeads(email));
  }, [dispatch, email]);
  useEffect(() => {
    vendedorAllLeadsHistory && setData(vendedorAllLeadsHistory);
  }, [vendedorAllLeadsHistory]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data && data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  //FILTER********
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

  const handlerFilter = (filter) => {
    dispatch(getVendedorAllLeads(email));
    setFilterSector("");
    setFilterName("");
    setFilterPais("");
    setOpenFilterName(false);
    setOpenFilterSector(false);
    setOpenFilterPais(false);
    setOpenFilterStatus(false);
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
  const [statusValue, setStatusValue] = useState("");

  const onChangeLevel = (value) => {
    setLevelValue(value);

    dispatch(filterLevel(value));
    setData(vendedorAllLeadsHistory);
    setCurrentPage(1);
    if (!value) {
      setFilters({ ...filters, level: !filters.level });
    }
  };

  const onChangeName = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterName(event.target.value);
    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredName = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.name.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredName);

    if (event.target.value === "") {
      dispatch(getVendedorAllLeads(email));
    }
  };

  const onChangeSector = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterSector(event.target.value);

    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredSector = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.category.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredSector);
    if (event.target.value === "") {
      dispatch(getVendedorAllLeads(email));
    }
  };
  const onChangePais = (event) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setFilterPais(event.target.value);

    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");

    const leadsFilteredPais = vendedorAllLeadsHistory.filter((item) =>
      normalizeString(item.province.toLowerCase()).includes(
        normalizeString(event.target.value.toLowerCase())
      )
    );

    setData(leadsFilteredPais);
    if (event.target.value === "") {
      dispatch(getVendedorAllLeads(email));
    }
  };

  const onChangeStatus = (value) => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    console.log(value)
    // setStatusValue(event.target.value);


    const leadsFilteredPais = vendedorAllLeadsHistory.filter((item) => item.status === value);

    setData(leadsFilteredPais);
    if (value === "s") {
      dispatch(getVendedorAllLeads(email));
    }
  };




  //*********** */
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

  const updateLeads = () => {
    dispatch(getVendedorAllLeads(email));
    setData(vendedorAllLeadsHistory);
  };

  const handlerOpenFilterName = () => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterSector(false);
    setOpenFilterPais(false);
    setOpenFilterStatus(false);
    setOpenFilterName(!openFilterName);
    setFilterSector("");
    setFilterPais("");
    dispatch(getVendedorAllLeads(email));
  };
  const handlerOpenFilterSector = () => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterPais(false);
    setOpenFilterStatus(false);
    setOpenFilterSector(!openFilterSector);
    setFilterName("");
    setFilterPais("");
    dispatch(getVendedorAllLeads(email));
  };
  const handlerOpenFilterPais = () => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterSector(false);
    setOpenFilterStatus(false);
    setOpenFilterPais(!openFilterPais);
    setFilterName("");
    setFilterSector("");
    dispatch(getVendedorAllLeads(email));
  };
  const handlerOpenStatus = () => {
    setFilters({ level: false, runner: false, sellers: false, status: false });
    setOpenFilterName(false);
    setOpenFilterSector(false);
    setOpenFilterPais(false);
    setFilterPais("");
    setFilterName("");
    setFilterSector("");
    setOpenFilterStatus(!openFilterStatus);
    dispatch(getVendedorAllLeads(email));
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
              History
            </h1>
            <div className="flex gap-7 ">
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

              {filters.level === true ? (
                <div className=" flex justify-center items-center w-80">
                  <SelectLevel
                    onChange={onChangeLevel}
                    value={levelValue}
                    className="border-2 w-64"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterName === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangeName}
                    value={filterName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterSector === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangeSector}
                    value={filterSector}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Sector"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterPais === true ? (
                <div className=" flex justify-center items-center w-80">
                  <input
                    onChange={onChangePais}
                    value={filterPais}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-blue-500 focus:border-blue-500 block w-56 h-10 p-1 dark:bg-[#222131] dark:border-[#fafafa] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Pais"
                  />
                </div>
              ) : (
                ""
              )}
              {openFilterStatus === true ? (
                <div className=" flex justify-center items-center w-80">
                  <SelectStatus
                    onChange={onChangeStatus}
                    value={statusValue}
                    className="border-2 w-64"
                  />
                </div>
              ) : (
                ""
              )}

              {/* <select className="w-32 h-10 rounded-lg bg-purple-500 text-white text-center">
                  <option className="py-1">2023</option>
                </select> */}
            </div>
          </div>

          {data && data.length ? (
            <div className={style.table}>
              <div className="flex justify-start items-center  mx-6">
                <button
                  className="text-start w-[20%] px-3"
                  onClick={handlerOpenFilterName}
                >
                  Nombre
                </button>
                <button
                  className="text-start w-[15%] px-3"
                  onClick={handlerOpenFilterSector}
                >
                  Sector
                </button>
                <button
                  className="text-start w-[10%] px-3"
                  onClick={handlerOpenFilterPais}
                >
                  País
                </button>
                <label className="text-center w-[5%] ">Email</label>
                <label className="text-center w-[5%] ">Instagram</label>
                <label className="text-center w-[15%] ">Phone</label>
                <button
                  className="  w-[10%] text-center"
                  onClick={() => handlerFilter("level")}
                >
                  Nivel
                </button>
                <button
                  className="text-center w-[20%]"
                  onClick={handlerOpenStatus}
                >
                  Status
                </button>
              </div>

              <div className="">
                {console.log(currentCard)}
                {currentCard &&
                  currentCard.map((item, index) => (
                    <div
                      key={item._id}
                      className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 min-h-14 rounded-lg"
                    >
                      <div className=" w-[20%] flex justify-start items-center  p-0 ">
                        <p className="w-64 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.name}
                        </p>
                      </div>
                      <div className=" w-[15%] flex justify-start items-center p-0 ">
                        <p className="w-40 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.category}
                        </p>
                      </div>

                      <div className=" w-[10%] flex justify-start items-center p-0">
                        <p className="text-start w-24 p-1 px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
                          {item.province}
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
                          <div onClick={() => handleCopyClick(item.instagram)}>
                            <div className="cursor-pointer">
                              <CiInstagram className="text-[35px]  text-[#ff598b]" />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <CiInstagram className="text-[35px] text-[#9eabbe]" />
                          </div>
                        )}
                      </div>
                      <div className=" w-[15%] flex justify-center items-center p-0 ">
                        <p
                          onClick={() => handleCopyClick(item.telephone)}
                          className="text-start w-44 p-1 cursor-pointer px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
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
                        {item.status === "Contratado" && (
                          <p className="bg-[#26af7f] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                            Contratado
                          </p>
                        )}
                        {item.status === "No responde" && (
                          <p className="bg-[#2148b4] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                            Sin responder
                          </p>
                        )}
                        {item.status === "Rechazado" && (
                          <p className="bg-[#ac4242] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                            Rechazado
                          </p>
                        )}
                        {item.status === "Agendar 2do llamado" && (
                          <div className="bg-[#5bac42] w-44 h-11 flex flex-col justify-center items-center text-white rounded-3xl text-16">
                            <p>Agendar</p>
                            <p>2do llamado</p>
                          </div>
                        )}
                        {item.level === "incidencia" && (
                          <p className="bg-[#e5fc18] w-44 h-11 flex justify-center items-center text-black rounded-3xl text-18">
                            Incidencia
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <h1>No hay Leads disponibles</h1>
            </div>
          )}
        </div>
        {data && data.length > 10 && (
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
      </div>
    </>
  );
};

export default VendedoresHistory;
