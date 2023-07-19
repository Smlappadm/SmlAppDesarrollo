import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./CorredoresDashboard.module.css";
import Nav from "../../Nav/Nav";
import { motion } from "framer-motion";
import { CiGlobe, CiMail } from "react-icons/ci";
import { GrInstagram } from "react-icons/gr";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getAllCategory,
  getAllCorredoresByEmail,
  getAllCountries,
  getAllProfesion,
  getLeadCorredores,
} from "../../../redux/actions";
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLabelButtons from "./MaterialUi/IconLabelButtons";
import NestedModal from "./MaterialUi/NestedModal";
import InputRunner from "./MaterialUi/inputRunner";

const CorredoresDashboard = () => {
  const [client, setClient] = useState([]);
  const [detailsLead, setDetailsLead] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const { corredorLead } = useSelector((state) => state);
  const { corredor } = useSelector((state) => state);

  const dispatch = useDispatch();

  const user = useUser().user;
  const fullName = user?.fullName;

  let email = localStorage.getItem("email");

  localStorage.setItem("names", fullName);

  let corredorName = localStorage.getItem("corredorName");

  useEffect(() => {
    console.log(email);
    console.log(corredorName);
    dispatch(getLeadCorredores(email, corredorName, "", "", "", ""));
  }, [dispatch, corredor]);

  const handleCheckList = (index) => {
    setDetailsLead((prevDetailsLead) => {
      const updatedDetailsLead = [...prevDetailsLead];
      updatedDetailsLead[index] = !updatedDetailsLead[index];
      return updatedDetailsLead;
    });
  };

  const handleChangeInstagram = (event, index) => {
    const { name, value } = event.target;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        instagram: value,
      };
      return updatedClient;
    });
  };

  const handleChangeEmail = (event, index) => {
    const { name, value } = event.target;
    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        email: value,
      };
      return updatedClient;
    });
  };

  const handleClientClick = (event, index) => {
    const { name, value } = event.target;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      const currentValue = updatedClient[index].level;

      if (currentValue === value) {
        updatedClient[index] = {
          ...updatedClient[index],
          [name]: "",
          level: "",
        };
      } else {
        updatedClient[index] = {
          ...updatedClient[index],
          [name]: value,
          level: value,
        };
      }

      return updatedClient;
    });
  };

  const handleseguidores2000 = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;
    console.log(value);

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        seguidores2000: value,
      };

      return updatedClient;
    });
  };

  const handleRepercusion = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        repercusion: value,
      };

      return updatedClient;
    });
  };

  const handleFrecuencia = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        frecuencia: value,
      };

      return updatedClient;
    });
  };

  const handleContenidoPersonal = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        contenidoPersonal: value,
      };

      return updatedClient;
    });
  };

  const handleContenidoValor = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        contenidoValor: value,
      };

      return updatedClient;
    });
  };

  const handleCalidadInstagram = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        calidadInstagram: value,
      };

      return updatedClient;
    });
  };

  useEffect(() => {
    let clientes = [];
    let i = 0;
    if (corredorLead && corredorLead.length > 0) {
      for (let i = 0; i < corredorLead.length; i++) {
        if (corredorLead[i] && corredorLead[i]._id) {
          clientes.push({
            _id: corredorLead[i]._id,
            name: corredorLead[i].name,
            url: corredorLead[i].url,
            email: corredorLead[i].email,
            instagram: corredorLead[i].instagram,
            level: corredorLead[i].level,
            status_op: corredorLead[i].status_op,
            seguidores2000: corredorLead[i].seguidores2000,
            repercusion: corredorLead[i].repercusion,
            frecuencia: corredorLead[i].frecuencia,
            contenidoPersonal: corredorLead[i].contenidoPersonal,
            contenidoValor: corredorLead[i].contenidoValor,
            calidadInstagram: corredorLead[i].calidadInstagram,
            checked: false,
            view: true,
          });
        }
      }
    }
    setClient(clientes);
  }, [corredorLead]);

  useEffect(() => {
    const updateClients = async () => {
      if (corredorLead.length !== client.length) {
        return;
      }

      const promises = corredorLead.map((lead, i) =>
        axios.put(`/lead/${lead._id}`, {
          instagram: client[i].instagram,
          email: client[i].email,
          level: client[i].level,
        })
      );

      await Promise.all(promises);
    };

    updateClients();
  }, [client]);

  const SendLeads = (name) => {
    toast.info(`✔ ${name} Enviando formulario! `, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const SendLeadsErrorInsta = (name) => {
    toast.error(`❌ Error Instagram incompleto ${name}!`, {
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
  const SendLeadsErrorLevel = (name) => {
    toast.error(`❌ Error nivel incompleto ${name}!`, {
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
  const SendLeadsErrorInsta0 = (name) => {
    toast.error(`❌ Error instagram con nivel 0 ${name}!`, {
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
  const SendLeadsSuccess = () => {
    toast.success(`✔ Envío de leads exitoso!`, {
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
  const SendLeadsError = (name) => {
    toast.error(`✔ Error al enviar los leads! ${name}`, {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    SendLeads(user.fullName);
    try {
      for (let i = 0; i < corredorLead.length; i++) {
        const currentClient = client[i];

        if (currentClient.level !== "-") {
          if (
            currentClient.instagram.trim() !== "" &&
            (currentClient.level === "0" ||
              currentClient.level === "incidencia")
          ) {
            SendLeadsErrorInsta0(currentClient.name);
          } else if (
            currentClient.instagram.trim() === "" &&
            (currentClient.level === "incidencia" ||
              currentClient.level === "0")
          ) {
            const response = await axios.put(`/lead/${currentClient._id}`, {
              _id: currentClient._id,
              name: currentClient.name,
              url: currentClient.url,
              instagram: currentClient.instagram,
              email: currentClient.email,
              level: currentClient.level,
              seguidores2000: currentClient.seguidores2000,
              repercusion: currentClient.repercusion,
              frecuencia: currentClient.frecuencia,
              contenidoPersonal: currentClient.contenidoPersonal,
              contenidoValor: currentClient.contenidoValor,
              calidadInstagram: currentClient.calidadInstagram,
              checked: true,
              view: true,
              descargadosLeader: false,
              descargadosCorredor: false,
            });
            console.log(response.data);
          } else if (
            currentClient.instagram.trim() !== "" &&
            (currentClient.level === "1" || currentClient.level === "2")
          ) {
            const response = await axios.put(`/lead/${currentClient._id}`, {
              _id: currentClient._id,
              name: currentClient.name,
              url: currentClient.url,
              instagram: currentClient.instagram,
              email: currentClient.email,
              level: currentClient.level,
              seguidores2000: currentClient.seguidores2000,
              repercusion: currentClient.repercusion,
              frecuencia: currentClient.frecuencia,
              contenidoPersonal: currentClient.contenidoPersonal,
              contenidoValor: currentClient.contenidoValor,
              calidadInstagram: currentClient.calidadInstagram,
              checked: true,
              view: true,
              descargadosLeader: false,
              descargadosCorredor: false,
            });

            console.log(response.data);
          } else {
            SendLeadsErrorInsta(currentClient.name);
          }
        } else {
          SendLeadsErrorLevel(currentClient.name);
        }
      }

      console.log(corredor.name);
      const names = corredor.name;
      dispatch(getLeadCorredores(email, corredorName, "", "", "", ""));

      SendLeadsSuccess();
    } catch (error) {
      SendLeadsError();
      console.log({ error: error.message });
    }
  };

  const instagramRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;

  return (
    <>
      <Nav />
      <div className="w-full m-5 bg-[#222131]">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex gap-10  mt-2 mx-5 ">
              <h1 className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2">
                Dashboard
              </h1>
              <div className="flex gap-5">
                <Link to={"/corredores"}>
                  <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
                </Link>
                <Link className="text-5xl" to={"/corredores-history"}>
                  <FaHistory className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
                </Link>
                <Link className="text-5xl" to={"/corredores-analytics"}>
                  <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
                </Link>
              </div>
            </div>

            <div>
              <div className="flex mt-5 mb-2 items-center justify-center">
                <InputRunner
                  getLeadCorredores={getLeadCorredores}
                  email={email}
                  corredorName={corredorName}
                />
              </div>
            </div>

            <div className="flex gap-12" type="submit" onClick={handleSubmit}>
              <IconLabelButtons />
            </div>
          </div>

          {corredorLead && corredorLead.length > 0 ? (
            <div className="w-full">
              <div className={style.tableHead}>
                <div className={style.tableRow}>
                  <div className="text-start ml-20">Name</div>
                  <div className="text-start ml-5">Web</div>
                  <div className="text-start ml-12">Mail</div>
                  <div className="text-start ml-2">Instagram</div>
                  <div className="text-start ml-4">Nivel</div>
                  <div className="text-start ml-4"></div>
                </div>
              </div>

              <div className="">
                {client &&
                  client.map((item, index) => (
                    <div key={index} className={style.tableCards}>
                      <div className="flex p-0">
                        <div
                          className="ml-10"
                          type="text"
                          id="name"
                          value={item.name}
                        >
                          <p className="w-80 p-1 px-3 rounded-full text-ellipsis opacity-1 whitespace-nowrap overflow-hidden">
                            {item.name}
                          </p>
                        </div>
                      </div>

                      <>
                        <motion.div
                          className="flex"
                          initial={
                            detailsLead[index] === false
                              ? { x: -200 }
                              : { x: 0 }
                          } // Ancho inicial en 0
                          animate={
                            detailsLead[index] === false
                              ? { x: 0 }
                              : { x: -200 }
                          } // Ancho final al 100% (se ajusta automáticamente al ancho del contenedor padre)
                          transition={{ duration: 0.5 }} // Duración de la animación en segundos y tipo de transición "tween"
                          style={
                            detailsLead[index] === true && { display: "none" }
                          }
                        >
                          <div className="flex ml-[55px] p-0">
                            <Link to={item.url} target="_blank">
                              <p value={item.url}>
                                <CiGlobe className="text-[2rem] text-[#418df0]" />
                              </p>
                            </Link>
                          </div>

                          <div className="flex w-[20rem] gap-3 p-0 mx-24">
                            <div>
                              <CiMail className="text-[2rem] text-[#418df0]" />
                            </div>
                            <input
                              className={`bg-transparent w-[12rem] rounded-full border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white ${
                                item.email !== "-" && item.email !== ""
                                  ? "border-green-500"
                                  : ""
                              }`}
                              type="text"
                              name="email"
                              value={item.email}
                              onChange={(event) =>
                                handleChangeEmail(event, index)
                              }
                              placeholder="Ingrese un mail..."
                            />
                          </div>

                          <div className="flex w-[20rem] gap-3 p-0 mx-3">
                            <div>
                              {item.instagram &&
                              instagramRegex.test(item.instagram) ? (
                                <Link to={item.instagram} target="_blank">
                                  <GrInstagram className="text-[2rem] text-[#418df0]" />
                                </Link>
                              ) : (
                                <GrInstagram className="text-[2rem] text-[#418df0]" />
                              )}
                            </div>

                            <input
                              className={`bg-transparent w-[12rem] rounded-full border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white ${
                                item.instagram ? "border-green-500" : ""
                              }`}
                              type="text"
                              name="instagram"
                              value={item.instagram}
                              onChange={(event) =>
                                handleChangeInstagram(event, index)
                              }
                              placeholder="Ingrese instagram..."
                            />
                          </div>

                          <div className="flex ml-16 p-0">
                            <button
                              className={
                                item.level === "0"
                                  ? style.buttonNivelActive
                                  : style.buttonNivel
                              }
                              type="button"
                              name={item._id}
                              value="0"
                              onClick={(event) =>
                                handleClientClick(event, index)
                              }
                            >
                              0
                            </button>
                            <button
                              className={
                                item.level === "1"
                                  ? style.buttonNivelActive
                                  : style.buttonNivel
                              }
                              type="button"
                              name={item._id}
                              value="1"
                              onClick={(event) =>
                                handleClientClick(event, index)
                              }
                            >
                              1
                            </button>
                            <button
                              className={
                                item.level === "2"
                                  ? style.buttonNivelActive
                                  : style.buttonNivel
                              }
                              type="button"
                              name={item._id}
                              value="2"
                              onClick={(event) =>
                                handleClientClick(event, index)
                              }
                            >
                              2
                            </button>
                            <button
                              className={
                                item.level === "incidencia"
                                  ? style.buttonNivelActiveIncidence
                                  : style.buttonNivel
                              }
                              type="button"
                              name={item._id}
                              value="incidencia"
                              onClick={(event) =>
                                handleClientClick(event, index)
                              }
                            >
                              ⚠
                            </button>

                            {item.level === "incidencia" ? (
                              <div>
                                <NestedModal item={item} />
                              </div>
                            ) : null}
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center justify-center w-fit gap-3 p-0 mx-3"
                          initial={
                            detailsLead[index] === true ? { x: 200 } : { x: 0 }
                          } // Ancho inicial en 0
                          animate={
                            detailsLead[index] === true ? { x: 0 } : { x: 200 }
                          } // Ancho final al 100% (se ajusta automáticamente al ancho del contenedor padre)
                          transition={{ duration: 0.5 }} // Duración de la animación en segundos y tipo de transición "tween"
                          style={
                            detailsLead[index] === false && {
                              display: "none",
                            }
                          }
                        >
                          <div className="flex items-center justify-center w-fit text-center gap-1 py-[2px] ">
                            <p className="w-28 text-[.7rem]">
                              Tiene mas de 2000 Seguidores
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="seguidores2000"
                              checked={item.seguidores2000}
                              onChange={(event) =>
                                handleseguidores2000(event, index)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-center w-fit text-center gap-2 ">
                            <p className=" w-40 text-[.7rem]">
                              Tiene Repercusión en sus Reels-Publicaciones?
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="repercusion"
                              checked={item.repercusion}
                              onChange={(event) =>
                                handleRepercusion(event, index)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-center w-fit text-center gap-2 ">
                            <p className="w-32 text-[.7rem]">
                              Sube contenido con frecuencia?
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="frecuencia"
                              checked={item.frecuencia}
                              onChange={(event) =>
                                handleFrecuencia(event, index)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-center w-fit text-center gap-2 ">
                            <p className=" w-36 text-[.7rem]">
                              Su contenido tiende a la marca personal?
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="contenidoPersonal"
                              checked={item.contenidoPersonal}
                              onChange={(event) =>
                                handleContenidoPersonal(event, index)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-center w-fit text-center gap-2 ">
                            <p className=" w-28 text-[.7rem]">
                              Sube Contenido de valor?
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="contenidoValor"
                              checked={item.contenidoValor}
                              onChange={(event) =>
                                handleContenidoValor(event, index)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-center w-fit text-center gap-2 ">
                            <p className=" w-44 text-[.7rem]">
                              Su cuenta de instagram esta administrada con
                              caliad?
                            </p>
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              name="calidadInstagram"
                              checked={item.calidadInstagram}
                              onChange={(event) =>
                                handleCalidadInstagram(event, index)
                              }
                            />
                          </div>
                        </motion.div>
                      </>

                      <div
                        className="absolute right-12"
                        onClick={() => handleCheckList(index)}
                      >
                        Descripción
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <h1>NO HAY LEADS CON ESE FILTRADO...</h1>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CorredoresDashboard;
