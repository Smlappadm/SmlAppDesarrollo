import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClientByEmail } from "../../redux/actions";

export default function AddVideos() {
  const [link, setLink] = useState("");
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  const { client } = useSelector((state) => state);
  useEffect(() => {
    if (client) {
      console.log(client);
    }
  }, [client]);

  const newLinkVideo = async () => {
    const body = {
      videosPublicados: link,
    };
    try {
      await axios.put(`/clientes/addvideo?email=${userEmail}`, body);
    } catch (error) {
      console.log(error.message);
    }
    console.log(client && client.videosPublicados[1]);
  };

  return (
    <div className="flex bg-[#1A1A1A]  flex-col gap-2 justify-start items-center h-screen w-screen pt-10">
      <div className="flex ">
        <p className="text-24 font-extrabold text-white">Videos</p>
        <Link to={"/clientes-home"}>
          <p className="text-24 text-center font-extrabold text-white absolute right-4">
            x
          </p>
        </Link>
      </div>
      <div className=" mx-10 mt-4">
        <h2 className="font-medium text-neutral-100 text-center text-14">
          Copia y pega el link de tu nuevo video para añadirlo
        </h2>
      </div>
      <div className="w-[390px] flex justify-center items-center flex-row mt-5 text-[22px] h-[33px] px-6">
        <input
          className="text-black   rounded-lg  text-center text-[16px] rounded-l-full h-[33px] w-11/12"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Ingrese su link..."
        />
        <div
          className="text-white px-2 rounded-r-full  bg-[#07a1f8] hover:bg-[#127fbe] h-[33px]"
          onClick={newLinkVideo}
        >
          <p className="text-[22px] text-center">Añadir</p>
        </div>
      </div>
      <div>
        <p className="text-24 font-extrabold text-white mt-4 text-center">
          Historial
        </p>
        <div>
          {client && client?.videosPublicados ? (
            <div>
              {client.videosPublicados.map((link) => (
                <p>{link}</p>
              ))}
            </div>
          ) : (
            <p>nada</p>
          )}
        </div>
      </div>
    </div>
  );
}
