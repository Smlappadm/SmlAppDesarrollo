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
  return <div>RegisterDesktop</div>;
}
