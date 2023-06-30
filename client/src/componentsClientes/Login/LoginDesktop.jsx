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

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-y-4 mt-8">
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            variables: {
              spacingUnit: "0.8rem",
              borderRadius: "10px",
            },
            layout: {
              socialButtonsVariant: "blockButton",
              socialButtonsPlacement: "top",
            },
            elements: {
              socialButtonsBlockButton: "text-white bg-[#404062] m-0 ",
              formButtonPrimary: "hidden",
              formFieldInput: "hidden",
              card: " bg-transparent m-0 p-0 flex items-center h-fit",
              main: "flex flex-col p-0 m-0  w-3/4 bg-transparent",
              form: "hidden",
              formField: "hidden",
              dividerRow: "hidden",
              formFieldLabel: "hidden",
              footerActionText: "hidden",
              logoImage: "hidden",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton__slack: "hidden",
              button: "hidden",
              footerAction__signUp: "hidden",
              footer: "hidden",
              logoBox: "hidden",
              navbar: "hidden",
            },
          }}
          afterSignInUrl="/clientes-home"
        />

        <div className="flex ">
          <p>¿No tienes cuenta?</p>
          <button onClick={handleOpenRegister} className="text-blue-600 ml-1">
            Crea una!
          </button>
        </div>
      </div>
    </div>
  );
}
