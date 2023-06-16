import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { SignIn, useUser } from "@clerk/clerk-react";

export default function Login({ handleOpenRegister, handleJoin }) {
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
    <div
      className="flex flex-col"
      // style={{
      //   animation: "custom-bounce 2s",
      //   "@keyframes custom-bounce": {
      //     "0%": { transform: "translateY(0)" },
      //     "50%": { transform: "translateY(-20px)" },
      //     "100%": { transform: "translateY(0)" },
      //   },
      // }}
    >
      {/* <label className="font-bold ml-2 mt-4" htmlFor="">
        Usuario:
      </label>
      <input
        className="rounded-md bg-[#404062] h-7 pl-2 mt-2"
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Ingresar Usuario"
      />
      <label className="font-bold ml-2 mt-6" htmlFor="">
        Contraseña:
      </label>
      <div className="flex flex-row rounded-md bg-[#404062] h-7 justify-between items-center mt-2">
        <input
          className="rounded-md bg-[#404062] h-7 pl-2 w-full"
          type={showView === false ? "password" : "text"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Ingresar Contraseña"
        />
        {showView === false ? (
          <IoEyeSharp
            className="pr-2 text-[2rem]"
            onClick={handlePasswordView}
          />
        ) : (
          <IoEyeOffSharp
            className="pr-2 text-[2rem]"
            onClick={handlePasswordView}
          />
        )}
      </div> */}
      <div className="flex flex-col items-center gap-y-4 mt-8">
        {/* <button
          className="bg-[#07a1f8] rounded-2xl px-3 text-black"
          onClick={handleSubmit}
        >
          Ingresar
        </button> */}
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
