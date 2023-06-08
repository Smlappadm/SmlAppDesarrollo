import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    handleClose,
    observacion,
    corredor,
    vendedor,
  } = props;
  useEffect(() => {
    setClient(_id);
    setChangeMail(email);
    setChangePhone(telephone);
  }, [email, _id, telephone]);

  const [client, setClient] = useState("");

  const [visible, setVisible] = useState({
    email: false,
    telephone: false,
  });

  const [changeMail, setChangeMail] = useState("");
  const OpenChangeMail = () => {
    setVisible({ ...visible, email: true });
  };
  const OKChangeMail = () => {
    setUpdateLead({ ...updateLead, email: changeMail });
    setVisible({ ...visible, email: false });
  };

  // const [changePhone, setChangePhone] = useState("");
  // const OpenChangePhone = () => {
  //   setVisible({ ...visible, telephone: true });
  // };
  // const OKChangePhone = () => {
  //   setUpdateLead({ ...updateLead, telephone: changePhone });
  //   setVisible({ ...visible, telephone: false });
  // };

  // const [updateLead, setUpdateLead] = useState({
  //   email: changeMail,
  //   telephone: changePhone,
  // });

  // let body = {};
  // const SendFix = (client) => {
  //   body = { email: changeMail, telephone: changePhone };
  //   console.log("listo");
  //   console.log(client);
  //   console.log(body);
  //   axios.put(`lead/${client}`, body);
  // };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={props.open}
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
            {vendedor === "" ? (
              <>
                <div className="font-semibold flex gap-3">
                  <p>NIVEL: </p>
                  <p className="font-normal">{level}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>INSTAGRAM: </p>
                  <p className="font-normal">{instagram}</p>
                  <button>Change</button>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>TELEPHONE: </p>
                  {visible.telephone === false ? (
                    <>
                      <p className="font-normal">{changePhone}</p>
                      <button onClick={OpenChangePhone}>Change</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={changePhone}
                        onChange={(event) => {
                          setChangePhone(event.target.value);
                        }}
                      />
                      <button onClick={OKChangePhone}>OK</button>
                    </>
                  )}
                </div>
                <div className="font-semibold flex gap-3">
                  <p>EMAIL: </p>
                  {visible.email === false ? (
                    <>
                      <p className="font-normal">{changeMail}</p>
                      <button onClick={OpenChangeMail}>Change</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={changeMail}
                        onChange={(event) => {
                          setChangeMail(event.target.value);
                        }}
                      />
                      <button onClick={OKChangeMail}>OK</button>
                    </>
                  )}
                </div>
                <div className="w-28 font-semibold flex gap-3">
                  <p>WEB: </p>
                  <div className="w-64 text-ellipsis  flex justify-start items-center p-0">
                    <a
                      className="text-sm font-normal text-white rounded-full text-ellipsis opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
                      href={web}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {web}
                    </a>
                  </div>
                  <button className="text-white px-2">Change</button>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>CORREDOR: </p>
                  <p className="font-normal">{corredor}</p>
                </div>
              </>
            ) : null}

            {vendedor !== "" ? (
              <>
                <div className="font-semibold flex gap-3">
                  <p>NIVEL: </p>
                  <p className="font-normal">{level}</p>
                </div>
                <div className="w-28 font-semibold flex gap-3">
                  <p>WEB: </p>
                  <div className="w-28 text-ellipsis  flex justify-start items-center p-0">
                    <div className="w-64 text-ellipsis  flex justify-start items-center p-0">
                      <a
                        className="text-sm font-normal text-white rounded-full text-ellipsis opacity-1 overflow-hidden whitespace-nowrap hover:overflow-visible hover:bg-[#e3e1e1] hover:w-fit hover:text-black z-111 hover:absolute"
                        href={web}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {web}
                      </a>
                    </div>
                    <button className="text-white px-2">Change</button>
                  </div>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>TELEFONO: </p>
                  <p className="font-normal">{telephone}</p>
                  <button>Change</button>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>EMAIL: </p>
                  <p className="font-normal">{email}</p>
                  <button>Change</button>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>INSTAGRAM: </p>
                  <p className="font-normal">{instagram}</p>
                  <button>Change</button>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>OBSERVACION: </p>
                  <p className="font-normal">{observacion}</p>
                </div>
                <div className="font-semibold flex gap-3">
                  <p>VENDEDOR: </p>
                  <p className="font-normal">{vendedor}</p>
                </div>
              </>
            ) : null}

            <div>
              <button
                className="bg-blue-500 w-44 h-9 flex justify-center items-center text-white rounded-md text-10 ml-[350px]"
                onClick={() => {
                  SendFix(client, updateLead);
                }}
              >
                FIX
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
