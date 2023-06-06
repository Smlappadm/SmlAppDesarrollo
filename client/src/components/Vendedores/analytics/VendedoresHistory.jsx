import style from "./VendedoresHistory.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import {
  filterLevel,
  getLeadCheckedInactive5,
  getVendedorAllLeads,
} from "../../../redux/actions";
import { AiOutlinePhone } from "react-icons/ai";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { CiWarning, CiInstagram, CiMail } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import {MdOutlineAttachMoney } from "react-icons/md";
import {RiMoneyDollarBoxFill } from "react-icons/ri";




import Nav from "../../Nav/Nav";

const VendedoresHistory = () => {
  const [data, setData] = useState([]);
  const { leadCheckedInactive5 } = useSelector((state) => state);
  const { vendedorAllLeads } = useSelector((state) => state);
  // const { emailAddress } = user.primaryEmailAddress;
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
                <select className="w-32 h-10 rounded-lg bg-purple-500 text-white text-center">
                  <option className="py-1">2023</option>
                </select>
              </div>
            </div>
          </div>

          {vendedorAllLeads.length > 0 ? (
            <table className={style.table}>
  <thead className="text-gray-400 text-14 font-thin">
    <tr className={style.tableRow}>
      <th className="text-left">Nombre</th>
      <th className="text-left">Sector</th>
      <th className="text-left">País</th>
      <th className="text-left">Email</th>
      <th className="text-left">Instagram</th>
      <th className="text-left">Phone</th>
      <th className="text-left">Nivel</th>
      <th className="text-left">Status</th>
      <th className="text-left"></th>
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
                    <td className="flex justify-center items-center p-0 w-fit">
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
                    <p onClick={() => handleCopyClick(item.telephone)} className="text-start w-44 p-1 cursor-pointer px-3 rounded-full text-ellipsis text-18 opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute">
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
                    <td>
                      {/* esto es hardcodeo */}
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
                      {item.status === "incidencia" && (
                        <p className="bg-[#e5fc18] w-44 h-11 flex justify-center items-center text-white rounded-3xl text-18">
                          Incidencia
                        </p>
                      )}
                    </td>

                    <td className="flex justify-start items-start p-0 w-fit"></td>
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
      </div>
    </>
  );
};

export default VendedoresHistory;
