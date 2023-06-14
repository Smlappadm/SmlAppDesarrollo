import style from "./VendedoresHistory.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { filterLevel, getVendedorAllLeads } from "../../../redux/actions";
import { AiOutlinePhone } from "react-icons/ai";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

import Nav from "../../Nav/Nav";

const VendedoresHistory = () => {
  const [data, setData] = useState([]);
  const { leadCheckedInactive5 } = useSelector((state) => state);
  const { vendedorAllLeads } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const user = useUser().user;
  const email = user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    dispatch(getVendedorAllLeads(email));
  }, [dispatch]);
  useEffect(() => {
    setData(vendedorAllLeads);
  }, [vendedorAllLeads]);
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

  //FILTER********
  const [filters, setFilters] = useState({
    level: false,
    runner: false,
    sellers: false,
    status: false,
  });

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
    setData(vendedorAllLeads);
    setCurrentPage(1);
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
    setData(vendedorAllLeads);
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
              <div className="absolute right-14">
                {/* <select className="w-32 h-10 rounded-lg bg-purple-500 text-white text-center">
                  <option className="py-1">2023</option>
                </select> */}
              </div>
            </div>
          </div>

          {vendedorAllLeads.length > 0 ? (
            <table className={style.table}>
              <div className="flex justify-start items-center  mx-6">
                <label className="text-start w-[20%] px-3">Nombre</label>
                <label className="text-start w-[15%] px-3">Sector</label>
                <label className="text-start w-[10%] px-3">País</label>
                <label className="text-center w-[5%] ">Email</label>
                <label className="text-center w-[5%] ">Instagram</label>
                <label className="text-center w-[15%] ">Phone</label>
                <button className="text-center  w-[10%]">Nivel</button>
                <label className="text-center w-[20%] ">Status</label>
                
              </div>

              <tbody className="">
                {currentCard.map((item, index) => (
                   <div key={item._id} className=" flex items-center justify-start bg-[#39394B] text-sm text-gray-300 p-2 m-3 min-h-14 rounded-lg">
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
                      {item.level === "incidencia" && (
                        <p className="bg-[#e5fc18] w-44 h-11 flex justify-center items-center text-black rounded-3xl text-18">
                          Incidencia
                        </p>
                      )}
                    </div>

                   
                    </div>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <h1>No hay Leads disponibles</h1>
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
      </div>
    </>
  );
};

export default VendedoresHistory;
