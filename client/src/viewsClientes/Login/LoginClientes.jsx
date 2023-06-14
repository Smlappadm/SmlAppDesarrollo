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
    <div className="w-screen h-screen bg-[#020131] flex flex-col justify-start items-center">
      <img
        src="https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
        alt=""
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
  );
}
