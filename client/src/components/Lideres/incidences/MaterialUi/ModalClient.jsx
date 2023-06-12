import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateLeadIncidence } from "../../../../redux/actions";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(55 65 81)",
  boxShadow: 24,
  p: 4,
  textColor: "white",
  color: "white",
  height: 700,
  borderRadius: "20px",
};

export default function BasicModal(props) {
  const {
    _id,
    name,
    category,
    level,
    email,
    instagram,
    telephone,
    city,
    province,
    web,
    open,
    handleClose,
    observacion,
    corredor,
    vendedor,
    fixed,
    status,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setClient(_id);
    setChangeMail(email);
    setChangePhone(telephone);
    setChangeWeb(web);
    setChangeIG(instagram);
    setChangeLevel(level);
  }, [email, _id, telephone, web, instagram, level, dispatch]);

  const [client, setClient] = useState("");

  const [visible, setVisible] = useState({
    email: false,
    telephone: false,
    web: false,
    instagram: false,
    level: false,
  });

  const [changeMail, setChangeMail] = useState("");
  const OpenChangeMail = () => {
    setVisible({ ...visible, email: true });
  };
  const OKChangeMail = () => {
    setVisible({ ...visible, email: false });
  };

  const [changePhone, setChangePhone] = useState("");
  const OpenChangePhone = () => {
    setVisible({ ...visible, telephone: true });
  };
  const OKChangePhone = () => {
    setVisible({ ...visible, telephone: false });
  };

  const [changeWeb, setChangeWeb] = useState("");
  const OpenChangeWeb = () => {
    setVisible({ ...visible, web: true });
  };
  const OKChangeWeb = () => {
    setVisible({ ...visible, web: false });
  };

  const [changeIG, setChangeIG] = useState("");
  const OpenChangeIG = () => {
    setVisible({ ...visible, instagram: true });
  };
  const OKChangeIG = () => {
    setVisible({ ...visible, instagram: false });
  };

  const [changeLevel, setChangeLevel] = useState("");
  const OpenChangeLevel = () => {
    setVisible({ ...visible, level: true });
  };
  const OKChangeLevel = () => {
    setVisible({ ...visible, level: false });
  };

  let body = {};
  const SendFixCorredor = (client) => {
    body = {
      email: changeMail,
      telephone: changePhone,
      url: changeWeb,
      instagram: changeIG,
      level: changeLevel,
      checked:
        changeLevel !== "incidencia" || changeLevel !== "0" ? true : false,
      status: changeLevel === "0" ? "discard" : status,
    };
    dispatch(updateLeadIncidence(client, body));
    handleClose();
    FixedLeadAlert();
    fixed(body);
  };
  const SendFixVendedor = (client) => {
    body = {
      email: changeMail,
      telephone: changePhone,
      url: changeWeb,
      instagram: changeIG,
      level: changeLevel,
    };
    dispatch(updateLeadIncidence(client, body));
    handleClose();
    FixedLeadAlert();
    fixed(body);
  };
  const DiscardLead = (client) => {
    body = {
      email: changeMail,
      telephone: changePhone,
      url: changeWeb,
      instagram: changeIG,
      level: "0",
      checked: true,
      view: true,
      status: "discard",
      status_op: "",
    };
    console.log(body);
    dispatch(updateLeadIncidence(client, body));
    handleClose();
    DiscardLeadAlert();
    fixed(body);
  };

  const FixedLeadAlert = () => {
    toast.success(`✔ FIXED LEAD! `, {
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
  const DiscardLeadAlert = () => {
    toast.success(`✔ DISCARD LEAD! `, {
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

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.3)",
          },
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <div className="font-semibold flex flex-col gap-3 items-center text-24 mb-5">
              <h1>{name} </h1>
              <hr className="border-gray-400 w-5/6 text-center" />
            </div>
            <div className="font-semibold flex gap-3">
              <p>CATEGORIA: </p>
              <p className="font-normal">{category} </p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CIUDAD: </p>
              <p className="font-normal">
                {province}, {city}{" "}
              </p>
            </div>

            {vendedor !== "" ? (
              <div className="font-semibold flex gap-3">
                <p>NIVEL: </p>
                {visible.level === false ? (
                  <div className="w-[500px] flex flex-row justify-between">
                    <p className="font-normal ">{changeLevel}</p>
                    <button
                      className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2 "
                      onClick={OpenChangeLevel}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="w-[500px] flex flex-row justify-between">
                    <select
                      name="level"
                      id="level"
                      placeholder="Selecciona nivel"
                      className="text-black w-80"
                      value={changeLevel}
                      onChange={(event) => {
                        setChangeLevel(event.target.value);
                      }}
                    >
                      <option value="incidencia">Incidencia</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <button
                      className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                      onClick={OKChangeLevel}
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="font-semibold flex gap-3">
                <p>NIVEL: </p>
                {visible.level === false ? (
                  <div className="w-[500px] flex flex-row justify-between">
                    <p className="font-normal w-80">{changeLevel}</p>
                    <button
                      className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2"
                      onClick={OpenChangeLevel}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="w-[500px] flex flex-row justify-between">
                    <select
                      name="level"
                      id="level"
                      placeholder="Selecciona nivel"
                      className="text-black w-80"
                      value={changeLevel}
                      onChange={(event) => {
                        setChangeLevel(event.target.value);
                      }}
                    >
                      <option value="incidencia">Incidencia</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <button
                      className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                      onClick={OKChangeLevel}
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="font-semibold flex gap-3">
              <p>INSTAGRAM: </p>
              {visible.instagram === false ? (
                <div className="w-[500px] flex flex-row justify-between">
                  <p className="font-normal">{changeIG}</p>
                  <button
                    className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OpenChangeIG}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="w-[500px] flex flex-row justify-between">
                  <input
                    type="text"
                    className="text-black w-80"
                    value={changeIG}
                    onChange={(event) => {
                      setChangeIG(event.target.value);
                    }}
                  />
                  <button
                    className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OKChangeIG}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
            <div className="font-semibold flex gap-3">
              <p>TELEPHONE: </p>
              {visible.telephone === false ? (
                <div className="w-[500px] flex flex-row justify-between">
                  <p className="font-normal">{changePhone}</p>
                  <button
                    className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OpenChangePhone}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="w-[500px] flex flex-row justify-between">
                  <input
                    type="text"
                    className="text-black w-80"
                    value={changePhone}
                    onChange={(event) => {
                      setChangePhone(event.target.value);
                    }}
                  />
                  <button
                    className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OKChangePhone}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
            <div className="font-semibold flex gap-3">
              <p>EMAIL: </p>
              {visible.email === false ? (
                <div className="w-[500px] flex flex-row justify-between">
                  <p className="font-normal">{changeMail}</p>
                  <button
                    className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OpenChangeMail}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="w-[500px] flex flex-row justify-between">
                  <input
                    type="text"
                    className="text-black w-80"
                    value={changeMail}
                    onChange={(event) => {
                      setChangeMail(event.target.value);
                    }}
                  />
                  <button
                    className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OKChangeMail}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
            <div className=" font-semibold flex gap-3">
              <p>WEB: </p>
              {visible.web === false ? (
                <div className="w-[500px] flex flex-row justify-between">
                  <div className="w-64 text-ellipsis  flex justify-start items-center p-0">
                    <a
                      className="text-sm font-normal text-white rounded-full text-ellipsis opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
                      href={changeWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {changeWeb}
                    </a>
                  </div>
                  <button
                    className="bg-blue-400  flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OpenChangeWeb}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="w-[500px] flex flex-row justify-between">
                  <input
                    type="text"
                    className="text-black w-80"
                    value={changeWeb}
                    onChange={(event) => {
                      setChangeWeb(event.target.value);
                    }}
                  />
                  <button
                    className="bg-green-600 flex justify-center items-center text-white rounded-md text-10 px-2"
                    onClick={OKChangeWeb}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
            <div className="font-semibold flex gap-3">
              <p>OBSERVACION: </p>
              <p className="font-normal">{observacion}</p>
            </div>
            <div className="font-semibold flex gap-3">
              <p>CORREDOR: </p>
              <p className="font-normal">{corredor}</p>
            </div>

            {vendedor !== "" ? (
              <div className="w-[500px] flex flex-row justify-between">
                <div className="font-semibold flex gap-3">
                  <p>VENDEDOR: </p>
                  <p className="font-normal">{vendedor}</p>
                </div>
              </div>
            ) : null}

            {vendedor !== "" ? (
              <div className="flex flex-row justify-around">
                <button
                  className="bg-red-500 w-44 h-9 flex justify-center items-center text-white rounded-md text-10 "
                  onClick={() => {
                    DiscardLead(client);
                  }}
                >
                  DESCARTAR CLIENTE
                </button>
                <button
                  className="bg-blue-500 w-44 h-9 flex justify-center items-center text-white rounded-md text-10 "
                  onClick={() => {
                    SendFixVendedor(client);
                  }}
                >
                  ACTUALIZAR
                </button>
              </div>
            ) : (
              <div className="flex flex-row justify-around">
                <button
                  className="bg-red-500 w-44 h-9 flex justify-center items-center text-white rounded-md text-10 "
                  onClick={() => {
                    DiscardLead(client);
                  }}
                >
                  DESCARTAR CLIENTE
                </button>
                <button
                  className="bg-blue-500 w-44 h-9 flex justify-center items-center text-white rounded-md text-10 "
                  onClick={() => {
                    SendFixCorredor(client);
                  }}
                >
                  ACTUALIZAR
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
