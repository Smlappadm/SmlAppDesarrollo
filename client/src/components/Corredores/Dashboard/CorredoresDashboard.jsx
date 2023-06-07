import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./CorredoresDashboard.module.css";
import Nav from "../../Nav/Nav";

import { CiGlobe, CiMail } from "react-icons/ci";
import { GrInstagram } from "react-icons/gr";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  getAllProfesion,
  getLeadCorredores,
} from "../../../redux/actions";
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconLabelButtons from "./MaterialUi/IconLabelButtons";
import BasicButtons from "./MaterialUi/BasicButtons";

const CorredoresDashboard = () => {
  const [client, setClient] = useState([]);
  const [profesion, setProfesion] = useState("");
  const [country, setCountry] = useState("");
  const [marca_personal, setMarca_personal] = useState("");
  const [category, seCategory] = useState("");

  const { corredorLead } = useSelector((state) => state);
  const { allCountries } = useSelector((state) => state);
  const { allProfesion } = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = useUser().user;
  const mail = user?.emailAddresses[0]?.emailAddress;

  localStorage.setItem("email", mail);
  let email = localStorage.getItem("email");

  useEffect(() => {
    if (mail !== undefined) {
      dispatch(getLeadCorredores(email, profesion, country, marca_personal));
      dispatch(getAllProfesion());
      dispatch(getAllCountries());
    }
  }, [dispatch, mail]);

  const filtrar = () => {
    dispatch(getLeadCorredores(email, profesion, country, marca_personal));
  };

  const filterProfesion = (event) => {
    const { value } = event.target;
    setProfesion(value);
  };

  const filterCountry = (event) => {
    const { value } = event.target;
    setCountry(value);
  };

  const filterCategory = (event) => {
    const { value } = event.target;
    seCategory(value);
  };

  const checkMarcaPersonal = () => {
    if (marca_personal) {
      setMarca_personal("SI");
    } else {
      setMarca_personal("");
    }
  };

  useEffect(() => {
    checkMarcaPersonal();
  }, [checkMarcaPersonal]);

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
      updatedClient[index] = {
        ...updatedClient[index],
        [name]: value,
        level: value,
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
            level: "-",
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
      for (let i = 0; i < corredorLead.length; i++) {
        const response = await axios.put(`/lead/${client[i]._id}`, {
          instagram: client[i].instagram,
          email: client[i].email,
          level: client[i].level,
        });
      }
    };

    updateClients();
  }, [client]);

  const SendLeads = (name) => {
    toast.info(`✔ ${name} Send Leads! `, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const SendLeadsErrorInsta = (name) => {
    toast.error(`❌ Error Instagram incomplete ${name}!`, {
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
    toast.error(`❌ Error Instagram incomplete ${name}!`, {
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
    toast.error(`❌ Error Instagram with Level 0 ${name}!`, {
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
    toast.success(`✔ Send Leads Success!`, {
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
    toast.error(`✔ Send Leads Error! ${name}`, {
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
        if (client[i].level !== "-") {
          if (client[i].instagram.trim() !== "" && client[i].level === "0") {
            SendLeadsErrorInsta0(client[i].name);
          } else if (
            client[i].instagram.trim() === "" &&
            (client[i].level === "incidencia" || client[i].level === "0")
          ) {
            const response = await axios.put(`/lead/${client[i]._id}`, {
              _id: client[i]._id,
              name: client[i].name,
              url: client[i].url,
              instagram: client[i].instagram,
              email: client[i].email,
              level: client[i].level,
              checked: true,
              view: true,
            });
          } else if (
            client[i].instagram.trim() !== "" &&
            client[i].level !== "-"
          ) {
            const response = await axios.put(`/lead/${client[i]._id}`, {
              _id: client[i]._id,
              name: client[i].name,
              url: client[i].url,
              instagram: client[i].instagram,
              email: client[i].email,
              level: client[i].level,
              checked: true,
              view: true,
            });
          } else {
            SendLeadsErrorInsta(client[i].name);
          }
        } else {
          SendLeadsErrorLevel(client[i].name);
        }
      }

      dispatch(getLeadCorredores(email, profesion, country, marca_personal));
      dispatch(getAllProfesion());
      dispatch(getAllCountries());

      SendLeadsSuccess();
    } catch (error) {
      SendLeadsError();
      console.log({ error: error.message });
    }
  };

  return (
    <>
      <Nav />
      <div className="w-full m-5 bg-[#222131]">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <div className="flex gap-10  mt-2 mx-5 ">
              <h1 className="font-bold text-[#e2e2e2] text-lg">Dashboard</h1>
              <div className="flex gap-5">
                <Link to={"/corredores"}>
                  <IoGrid className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
                </Link>
                <Link className="text-5xl" to={"/corredores-history"}>
                  <IoStatsChart className="text-[2rem] text-[#418df0] hover:text-[#3570bd]" />
                </Link>
              </div>
            </div>

            <div className="flex gap-12" type="submit" onClick={handleSubmit}>
              <IconLabelButtons />
            </div>
          </div>

          <div className="flex gap-5 mt-5 justify-center items-center">
            <label>Profesion: </label>
            <select
              className={`bg-transparent w-[12rem] rounded-full border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white`}
              value={profesion}
              onChange={filterProfesion}
            >
              {allProfesion &&
                allProfesion.map((option, index) => (
                  <option className="text-black" key={index} value={option}>
                    {option}
                  </option>
                ))}

              <option className="text-black" value="">
                Otras Profesiones
              </option>
            </select>
            <label>Pais: </label>
            <select
              className={`bg-transparent w-[12rem] rounded-full border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 placeholder-white`}
              value={country}
              onChange={filterCountry}
            >
              <option
                disabled="disabled"
                className="text-black"
                value=""
              ></option>
              {allCountries &&
                allCountries.map((option, index) => (
                  <option className="text-black" key={index} value={option}>
                    {option}
                  </option>
                ))}
              <option className="text-black" value="">
                Otras Paises
              </option>
            </select>

            <label>Nombre Propio: </label>
            <input
              className="mr-5 h-6 w-6"
              type="checkbox"
              checked={marca_personal}
              onChange={(e) => setMarca_personal(e.target.checked)}
            />
            <div onClick={filtrar}>
              <BasicButtons />
            </div>
          </div>
          {corredorLead && corredorLead.length > 0 ? (
            <table className="w-full">
              <thead className={style.tableHead}>
                <tr className={style.tableRow}>
                  <th className="text-start">Name</th>
                  <th className="text-start">Web</th>
                  <th className="text-start">Mail</th>
                  <th className="text-start">Instagram</th>
                  <th className="text-start">Nivel</th>
                </tr>
              </thead>

              <tbody className="h-3/4">
                {client &&
                  client.map((item, index) => (
                    <tr key={index} className={style.tableCards}>
                      <td className="flex justify-start items-center p-0">
                        <div type="text" id="name" value={item.name}>
                          <p className="w-96 p-1 px-3 rounded-full text-ellipsis opacity-1 whitespace-nowrap overflow-hidden">
                            {item.name}
                          </p>
                        </div>
                      </td>

                      <td className="flex justify-start items-center p-0">
                        <Link to={item.url} target="_blank">
                          <p value={item.url}>
                            <CiGlobe className="text-[2rem] text-[#418df0]" />
                          </p>
                        </Link>
                      </td>

                      <td className="flex justify-start w-[10rem] items-center gap-3 p-0 mx-3">
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
                          onChange={(event) => handleChangeEmail(event, index)}
                          placeholder="Ingrese un mail..."
                        />
                      </td>

                      <td className="flex justify-start w-[10rem] items-center gap-3 p-0 mx-3">
                        <div>
                          <GrInstagram className="text-[2rem] text-[#418df0]" />
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
                      </td>

                      <td className="flex justify-start items-center p-0">
                        <button
                          className={
                            item.level === "0"
                              ? style.buttonNivelActive
                              : style.buttonNivel
                          }
                          type="button"
                          name={item._id}
                          value="0"
                          onClick={(event) => handleClientClick(event, index)}
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
                          onClick={(event) => handleClientClick(event, index)}
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
                          onClick={(event) => handleClientClick(event, index)}
                        >
                          2
                        </button>
                        <button
                          className={
                            item.level === "incidencia"
                              ? style.buttonNivelActive
                              : style.buttonNivel
                          }
                          type="button"
                          name={item._id}
                          value="incidencia"
                          onClick={(event) => handleClientClick(event, index)}
                        >
                          ⚠
                        </button>
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
        </form>
      </div>
    </>
  );
};

export default CorredoresDashboard;
