import { Link } from "react-router-dom";
import style from "./Promociones.module.css";
import PaginationOutlined from "../../pagination/PaginationOutlined";
import { Card, Text, Title } from "@tremor/react";
import {
  CiMail,
  CiInstagram,
  CiPhone,
  CiWarning,
  CiGlobe,
} from "react-icons/ci";
import Nav from "../../Nav/Nav";
import { useEffect, useState } from "react";
import {
  IoGrid,
  IoLogoSnapchat,
  IoStatsChart,
  IoRocketOutline,
} from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import AgregarPromosion from "./MaterialUi/AgregarPromosion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPromociones } from "../../../redux/actions";
import ActualizarPromocion from "./MaterialUi/ActualizarPromocion";

export const Promociones = () => {
  const dispatch = useDispatch();
  const { promociones } = useSelector((state) => state);
  const [data, setData] = useState([]);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(8);

  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = data && data.slice(indexFirstCard, indexLastCard);
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPromociones());
  }, [dispatch]);

  useEffect(() => {
    if (promociones.length > 0) {
      setData(promociones);
    }
  }, [promociones]);

  return (
    <>
      <Nav />
      <Card className="w-full h-full  bg-[#222131] rounded-none p-5">
        <div className="flex  justify-between mx-5 mb-10">
          <div className="flex gap-5 ">
            <Title className="font-bold text-[#e2e2e2] w-40 text-lg mx-5 mt-2">
              Promociones
            </Title>

            <Link
              className="flex items-center justify-center gap-2"
              to={"/contratando/"}
            >
              <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Seguimiento</p>
            </Link>
            <Link
              className="flex items-center justify-center gap-2"
              to={"/lideres/"}
            >
              <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
              <p className="text-white">Empleados</p>
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
          </div>

          <div className="flex gap-5">
            <AgregarPromosion />
          </div>
        </div>
        <div className="text-white  text-14 font-thin">
          <div className="flex rounded-lg items-center px-10 py-3 ">
            <div className="flex  justify-center w-fit items-center p-0 ml-28">
              <Text className="text-start w-fit p-0 text-white">Promoción</Text>
            </div>

            <div className="flex  justify-center w-fit items-center p-0 ml-96">
              <Text className="text-center w-fit p-0 text-white">
                Link de Stripe
              </Text>
            </div>
            <div className="flex  justify-center w-fit items-center p-0 ml-[13.5rem]">
              <Text className="text-start w-fit p-0 text-white">
                Horas de Promoción
              </Text>
            </div>
            <div className="flex  justify-center w-fit items-center p-0 ml-10">
              <Text className="text-center w-fit p-0 text-white">
                Monto Total
              </Text>
            </div>
            <div className="flex  justify-center w-fit items-center p-0 ml-[4.5rem]">
              <Text className="text-center w-fit p-0 text-white">Cuota</Text>
            </div>
            <div className="flex  justify-center w-fit items-center p-0  ml-[4.5rem]">
              <Text className="text-center w-fit p-0 text-white">
                Valor Cuotas
              </Text>
            </div>
            <div className="flex  justify-center w-fit items-center p-0 ml-20">
              <Text className="text-center w-fit p-0 text-white">Estado</Text>
            </div>
          </div>
        </div>

        {currentCard && currentCard.length > 0 ? (
          currentCard.map((item, index) => (
            <div key={index} className="w-full mt-4">
              <div className="flex  bg-[#39394b] hover:bg-[#313141] rounded-lg items-center justify-around px-10 py-3">
                <div className="flex  justify-center items-center p-0 ">
                  <div className="w-64 flex justify-center items-center ">
                    <Text className=" text-white rounded-full">
                      {item.promocion.name}
                    </Text>
                  </div>
                </div>

                <div className="flex  justify-center items-center p-0">
                  <div className="w-[32rem] text-ellipsis  flex justify-center items-center p-0 ">
                    <Text className="text-white">{item.promocion.link}</Text>
                  </div>
                </div>
                <div className="flex  justify-center items-center p-0">
                  <div className="w-20 text-ellipsis  flex justify-center items-center p-0 ">
                    <Text className="text-white">{item.promocion.hora}</Text>
                  </div>
                </div>
                <div className="flex  justify-center items-center p-0">
                  <div className="w-20 text-ellipsis  flex justify-center items-center p-0 ">
                    <Text className="text-white">{item.promocion.monto}</Text>
                  </div>
                </div>
                <div className="flex  justify-center items-center p-0">
                  <div className="w-20 flex justify-center items-center p-0 ">
                    <Text className="text-white ">{item.promocion.cuota}</Text>
                  </div>
                </div>
                <div className="flex  justify-center items-center p-0">
                  <div className="w-20 flex justify-center items-center p-0 ">
                    <Text className="text-white">
                      {item.promocion.valorCuota}
                    </Text>
                  </div>
                </div>
                <div className="flex  justify-center items-center p-0">
                  <div className="w-28 flex justify-center items-center p-0 ">
                    <Text className="text-white">
                      {item.promocion.active ? "Activo" : "Inactivo"}
                    </Text>
                  </div>
                </div>
                <ActualizarPromocion item={item} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex text- justify-center items-center h-screen">
            <h1>No se encuentran promociones Cargadas</h1>
          </div>
        )}
        {data && data.length > 0 && data.length > 8 ? (
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={data}
            pages={pages}
            current={currentPage}
          />
        ) : null}
      </Card>
    </>
  );
};
