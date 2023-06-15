import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../componentsClientes/Login/Login";
import Register from "../../componentsClientes/Login/Register";
export default function Home() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);

  const handleJoin = () => {
    navigate("/clientes-home");
  };
  const handleOpenRegister = () => {
    setRegister(!register);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-[#020131]  to-blue-950  flex flex-col justify-start items-center pt-10">
      <div className="flex flex-col justify-center items-center w-96">
        <img
          src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
          alt=""
          className="w-28 h-28"
          onClick={handleOpenRegister}
        />
        {register === false ? (
          <Login
            handleOpenRegister={handleOpenRegister}
            handleJoin={handleJoin}
          />
        ) : (
          <Register handleOpenRegister={handleOpenRegister} />
        )}
      </div>
    </div>
  );
}
