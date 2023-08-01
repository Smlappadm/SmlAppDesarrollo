import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./CorredoresDashboard.module.css";
import Nav from "../../Nav/Nav";
import { motion } from "framer-motion";
import { CiGlobe, CiMail } from "react-icons/ci";
import { GrInstagram } from "react-icons/gr";
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
import NavBar from "../NavBar/NavBar";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CorredoresDashboard = () => {
  const [client, setClient] = useState([]);
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");
  const [marca_personal, setMarca_personal] = useState("");
  const [category, setCategory] = useState("");
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

  const { corredorLead, corredor } = useSelector((state) => state);

  const dispatch = useDispatch();

  const user = useUser().user;
  const mail = user?.emailAddresses[0]?.emailAddress;

  localStorage.setItem("email", mail);
  let email = localStorage.getItem("email");

  let names = localStorage.getItem("corredorName");

  const username = corredor.name;
  useEffect(() => {
    localStorage.setItem("corredorName", username);
  }, [corredor]);

  useEffect(() => {
    if (mail !== undefined) {
      dispatch(getAllCorredoresByEmail(mail));
    }
  }, [dispatch, mail, username]);

  useEffect(() => {
    if (mail !== undefined) {
      dispatch(
        getLeadCorredores(
          email,
          username,
          profesion,
          category,
          country,
          marca_personal
        )
      );
    }
    dispatch(getAllProfesion());
    dispatch(getAllCountries());
    dispatch(getAllCategory());
  }, [dispatch, mail, username]);

  const handleCheckList = (index) => {
    setDetailsLead((prevDetailsLead) => {
      const updatedDetailsLead = [...prevDetailsLead];
      updatedDetailsLead[index] = !updatedDetailsLead[index];
      return updatedDetailsLead;
    });
  };

  const handleChangeInput = (event, index) => {
    const { name, value } = event.target;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
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
        };
      } else {
        updatedClient[index] = {
          ...updatedClient[index],
          [name]: value,
        };
      }

      return updatedClient;
    });
  };

  const handleCheck = (event, index) => {
    const { name, checked } = event.target;
    const value = checked ? true : false;

    setClient((prevState) => {
      const updatedClient = [...prevState];
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
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
          seguidores2000: client[i].seguidores2000,
          repercusion: client[i].repercusion,
          frecuencia: client[i].frecuencia,
          contenidoPersonal: client[i].contenidoPersonal,
          contenidoValor: client[i].contenidoValor,
          calidadInstagram: client[i].calidadInstagram,
        })
      );

      await Promise.all(promises);
    };

    updateClients();
  }, [client]);

  const SendLeads = () => {
    toast.info(`✔ Enviando formulario! `, {
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

  const date = new Date();
  date.setHours(date.getHours() - 3);
  const formattedTime = date.toISOString();

  const instagramRegex =
    /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/;

  const handleSubmit = async () => {
    const updateLead = async (lead, index, lastLeadIndex) => {
      await axios.put(`/lead/${lead._id}`, {
        instagram: lead.instagram,
        email: lead.email,
        level: lead.level,
        seguidores2000: lead.seguidores2000,
        repercusion: lead.repercusion,
        frecuencia: lead.frecuencia,
        contenidoPersonal: lead.contenidoPersonal,
        contenidoValor: lead.contenidoValor,
        calidadInstagram: lead.calidadInstagram,
        updateCorredor: formattedTime,
        checked: true,
        view: true,
      });

      SendLeadsSuccess();
    };

    try {

      client.forEach(async (lead, index) => {
        const { level, instagram, name } = lead;

        if (level === "0" || level === "incidencia") {
          if (instagram !== "") {
            SendLeadsErrorInsta0(name);
          } else {
            if (index === 0) {
              SendLeads();
            }
            await updateLead(lead, index);
          }
        } else if (level === "1" || level === "2") {
          if (instagram !== "" && instagramRegex.test(instagram)) {
            if (index === 0) {
              SendLeads();
            }
            await updateLead(lead, index);
          } else {
            SendLeadsErrorInsta(name);
          }
        }
      });

      dispatch(
        getLeadCorredores(
          email,
          username,
          profesion,
          category,
          country,
          marca_personal
        )
      );
      dispatch(getAllProfesion());
      dispatch(getAllCountries());
      dispatch(getAllCategory());
    } catch (error) {
      SendLeadsError(names);
      console.log({ error: error.message });
    }
  };

  const handleSubmitOne = async (item) => {
    const updateLead = async (item) => {
      const response = await axios.put(`/lead/${item._id}`, {
        instagram: item.instagram,
        email: item.email,
        level: item.level,
        seguidores2000: item.seguidores2000,
        repercusion: item.repercusion,
        frecuencia: item.frecuencia,
        contenidoPersonal: item.contenidoPersonal,
        contenidoValor: item.contenidoValor,
        calidadInstagram: item.calidadInstagram,
        updateCorredor: formattedTime,
        checked: true,
        view: true,
      });

      SendLeadsSuccess();
    };

    try {
      if (item.level === "0" || item.level === "incidencia") {
        if (item.instagram !== "") {
          SendLeadsErrorInsta0(item.name);
        } else {
          SendLeads();
          await updateLead(item);
        }
      } else if (item.level === "1" || item.level === "2") {
        if (item.instagram !== "" && instagramRegex.test(item.instagram)) {
          SendLeads();
          await updateLead(item);
        } else {
          SendLeadsErrorInsta(item.name);
        }
      }

      dispatch(
        getLeadCorredores(
          email,
          username,
          profesion,
          category,
          country,
          marca_personal
        )
      );
      dispatch(getAllProfesion());
      dispatch(getAllCountries());
      dispatch(getAllCategory());
    } catch (error) {
      SendLeadsError(names);
      console.log({ error: error.message });
    }
  };

  return (
    <>
      <Nav />
      <div className="w-full m-5 bg-[#222131]">
        <ToastContainer />
        <div>
          <div className="flex justify-between items-center">
            <div className="flex  mt-2 ">
              <h1 className="font-bold text-[#e2e2e2] w-28 text-lg mx-5 mt-2">
                Dashboard
              </h1>
              <NavBar />
            </div>

            <div>
              <div className="flex mt-5 mb-2 items-center justify-center">
                <InputRunner
                  getLeadCorredores={getLeadCorredores}
                  email={email}
                  names={names}
                  profesion={profesion}
                  country={country}
                  marca_personal={marca_personal}
                  category={category}
                  setProfesion={setProfesion}
                  setCountry={setCountry}
                  setMarca_personal={setMarca_personal}
                  setCategory={setCategory}
                />
              </div>
            </div>

            <div
              className="flex gap-12 mr-5"
              type="submit"
              onClick={handleSubmit}
            >
              <IconLabelButtons />
            </div>
          </div>

          {corredorLead && corredorLead.length > 0 ? (
            <div className="w-full">
              <div className={style.tableHead}>
                <div className={style.tableRow}>
                  <div className="text-start ml-20 text-16">Name</div>
                  <div className="text-start ml-5 text-16">Web</div>
                  <div className="text-start ml-12 text-16">Mail</div>
                  <div className="text-start ml-2 text-16">Instagram</div>
                  <div className="text-start ml-4 text-16">Nivel</div>
                  <div className="text-start ml-4 text-16"></div>
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
                          <p className="w-80 p-1 px-3 rounded-md text-ellipsis opacity-1 whitespace-nowrap overflow-hidden">
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
                                <CiGlobe className="text-[2rem] text-[#ae2dff]" />
                              </p>
                            </Link>
                          </div>

                          <div className="flex w-[20rem] gap-3 p-0 mx-24">
                            <div>
                              <CiMail className="text-[2rem] text-[#ae2dff]" />
                            </div>
                            <input
                              className={`bg-transparent w-[12rem] rounded-md border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white ${
                                item.email !== "-" && item.email !== ""
                                  ? "border-green-500"
                                  : ""
                              }`}
                              type="text"
                              name="email"
                              value={item.email}
                              onChange={(event) =>
                                handleChangeInput(event, index)
                              }
                              placeholder="Ingrese un mail..."
                            />
                          </div>

                          <div className="flex w-[20rem] gap-3 p-0 mx-3">
                            <div>
                              {item.instagram &&
                              instagramRegex.test(item.instagram) ? (
                                <Link to={item.instagram} target="_blank">
                                  <GrInstagram className="text-[2rem] text-[#ae2dff]" />
                                </Link>
                              ) : (
                                <GrInstagram className="text-[2rem] text-[#ae2dff]" />
                              )}
                            </div>

                            <input
                              className={`bg-transparent w-[12rem] rounded-md border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white ${
                                item.instagram ? "border-green-500" : ""
                              }`}
                              type="text"
                              name="instagram"
                              value={item.instagram}
                              onChange={(event) =>
                                handleChangeInput(event, index)
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
                              name={"level"}
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
                              name={"level"}
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
                              name={"level"}
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
                              name={"level"}
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
                          }
                          animate={
                            detailsLead[index] === true ? { x: 0 } : { x: 200 }
                          }
                          transition={{ duration: 0.5 }}
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
                              checked={item.seguidores2000 || false}
                              onChange={(event) => handleCheck(event, index)}
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
                              checked={item.repercusion || false}
                              onChange={(event) => handleCheck(event, index)}
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
                              checked={item.frecuencia || false}
                              onChange={(event) => handleCheck(event, index)}
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
                              checked={item.contenidoPersonal || false}
                              onChange={(event) => handleCheck(event, index)}
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
                              checked={item.contenidoValor || false}
                              onChange={(event) => handleCheck(event, index)}
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
                              checked={item.calidadInstagram || false}
                              onChange={(event) => handleCheck(event, index)}
                            />
                          </div>
                        </motion.div>
                      </>

                      <div className="absolute right-12">
                        <div className="flex gap-3 items-center justify-center">
                          <div
                            className="ml-4"
                            type="submit"
                            onClick={() => handleSubmitOne(item)}
                          >
                            <Button
                              variant="text"
                              endIcon={
                                <SendIcon style={{ color: "#ae2dff" }} />
                              }
                            ></Button>
                          </div>

                          <div onClick={() => handleCheckList(index)}>
                            Descripción
                          </div>
                        </div>
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
        </div>
      </div>
    </>
  );
};

export default CorredoresDashboard;
