import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";

export default function Referral() {
  const [verificados, setVerificados] = useState([]);
  const { user } = useUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state);

  const checkVerifys = async () => {
    for (let i = 0; i < client.referred.length; i++) {
      const item = client.referred[i];
      const response = await axios.get(`/clientes/user?email=${item}`);
      const verify = response.data.verify;
      setVerificados((prevVerificados) => [...prevVerificados, verify]);
    }
  };
  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
    checkVerifys();
  }, [dispatch]);
  useEffect(() => {
    console.log(verificados);
  }, [client, verificados]);

  const copyRefSuccess = () => {
    toast.success("Codigo de Referido Copiado.", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#020131",
        color: "white",
        border: "1px solid",
        borderColor: "white",
      },
    });
  };

  const copyRefLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/clientes-home?ref=${userEmail && userEmail}`
    );
    copyRefSuccess();
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <p className="text-white text-24 mt-4">REFERIDOS</p>
      <div className="h-3/6 w-full items-start overflow-auto px-4 mt-6 border border-white">
        <p>{verificados}</p>
        {client && client.referred
          ? client.referred.map((item, index) => (
              <div className="flex items-center justify-between">
                <label className="m-4">{item}</label>
                {verificados[index] && verificados[index] === true ? (
                  <p>✅</p>
                ) : null}
              </div>
            ))
          : "no hay nada"}
      </div>
      <p className="text-center mt-4">
        Beneficios: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Soluta, ullam, voluptatem dolorem iste placeat beatae, blanditiis vel
        debitis veritatis excepturi minus! Odio corporis pariatur, sapiente
        ullam facilis et accusantium ipsum?
      </p>
      <button
        onClick={copyRefLink}
        className="w-11/12 text-center rounded-md mt-6 border border-white h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 text-white justify-center items-center flex "
      >
        Copiar Link de Referido!
      </button>
      <Toaster />
    </div>
  );
}
