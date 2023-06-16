import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail, updateClientProfile } from "../../redux/actions";

export default function ProfileSetting({ handleProfileSetting }) {
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [drive, setDrive] = useState("");
  const { client } = useSelector((state) => state);
  const { user } = useUser();
  const dispatch = useDispatch();
  const userEmail = user.emailAddresses[0].emailAddress;
  const userFullName = user.fullName;
  const userPhoto = user.imageUrl;

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);
  useEffect(() => {
    setUsername(client?.username || "");
    setInstagram(client?.instagram || "");
    setTiktok(client?.tiktok || "");
    setDrive(client?.drive || "");
  }, [client]);

  const handleSaveChanges = async () => {
    const body = {
      username: username === "" ? userFullName : username,
      photo: photo === "" ? userPhoto : photo,
      instagram,
      tiktok,
      drive,
    };
    dispatch(updateClientProfile(userEmail, body));
  };

  return (
    <>
      <div className=" flex mb-4 items-end justify-between pt-4">
        <h2 className="font-bold">Ajustes de Perfil</h2>
        <button
          onClick={handleProfileSetting}
          className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
        >
          <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
        </button>
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Cambiar Nombre de Usuario"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
          placeholder="Ingresar Instagram"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          value={tiktok}
          onChange={(event) => setTiktok(event.target.value)}
          placeholder="Ingresar TikTok"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <input
          type="text"
          value={drive}
          onChange={(event) => setDrive(event.target.value)}
          placeholder="Ingresar Google Drive"
          className="w-10/12 text-center rounded-md h-[40px] bg-gradient-to-br from-black via-[#020131]  to-blue-950 border placeholder:text-gray-500 text-white"
        />
        <button
          className="w-5/12 text-center rounded-md mt-6 border h-[40px] px-3 bg-gradient-to-t from-black via-[#020131]  to-blue-600 "
          onClick={handleSaveChanges}
        >
          Guardar
        </button>
      </div>
    </>
  );
}
