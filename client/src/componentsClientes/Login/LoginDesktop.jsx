import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { SignIn, useUser } from "@clerk/clerk-react";

export default function LoginDesktop({ handleOpenRegister, handleJoin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showView, setShowView] = useState(false);

  const handlePasswordView = () => {
    setShowView(!showView);
  };
  const handleSubmit = async () => {
    const response = await axios.get(`/clientes/username?username=${username}`);
    const client = response.data;
    console.log(client);
    if (username === client.username && password === client.password) {
      handleJoin();
    } else {
      console.log("todo mal");
    }
  };

  return <div>LoginDesktop</div>;
}
