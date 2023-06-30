import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientes } from "../../redux/actions";

export default function RegisterDesktop({ handleOpenRegister, refeerred }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [referred, setReferred] = useState("");
  const [showView, setShowView] = useState(false);
  const { allClientes } = useSelector((state) => state);
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    validate: false,
  });
  const dispatch = useDispatch();
  const handlePasswordView = () => {
    setShowView(!showView);
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllClientes());
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setReferred(refeerred);
  }, [allClientes]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const validateEmail = (email) => {
    console.log(email);
    const clientEmailVerify =
      allClientes && allClientes.some((client) => client.email === email);
    console.log();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Por favor, ingresa un correo electrónico válido";
    }
    if (clientEmailVerify) {
      console.log("Este usario ya esta registrado, intente con otro!");
      return "Este usario ya esta registrado, intente con otro!";
    }
    return "";
  };
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (!uppercaseRegex.test(password) || !numberRegex.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula y un número";
    }
    if (password.length < 8 || password.length > 16) {
      return "La contraseña debe tener entre 8 y 16 caracteres";
    }
    return "";
  };
  return <div>RegisterDesktop</div>;
}
