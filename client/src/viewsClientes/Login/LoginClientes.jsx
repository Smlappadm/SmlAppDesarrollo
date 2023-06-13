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
    <div>
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
