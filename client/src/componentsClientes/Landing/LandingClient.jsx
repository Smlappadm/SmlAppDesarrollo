import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";
import axios from "axios";

export default function LandingClient() {
  const user = useUser().user;
  const imgUser = user.imageUrl;

  const { client } = useSelector((state) => state);
  const dispatch = useDispatch();
  const userEmail = user.emailAddresses[0].emailAddress;
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const [nameIG, setNameIG] = useState("");
  const [imgInstagram, setImgInstagram] = useState(imgUser);
  const [numberInstagram, setNumberInstagram] = useState(1500);
  const [numberTiktok, setNumberTiktok] = useState(3300);
  const [numberTotal, setNumberTotal] = useState(2500);
  const [maxNumber, setMaxNumber] = useState("10K");

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  useEffect(() => {
    setName(client.username);
    setNumberTotal(numberTiktok + numberInstagram);
    name && setLoader(true);
  }, [client]);
  useEffect(() => {
    loader && obtainMetricsInstagram();
  }, [client]);

  const obtainMetricsInstagram = async () => {
    const userIG = client && client.instagram.slice(26, -1);
    const response = await axios.get(
      `https://apiflask-td8y.onrender.com/obtener_info_instagram?username=${userIG}`
    );
    const infoIG = response.data;
    setNameIG(userIG);
    console.log(userIG);
  };

  return (
    <div>
      <Header
        numberTotal={numberTotal}
        setMaxNumber={setMaxNumber}
        imgInstagram={imgInstagram}
      />
      <Name name={name} setName={setName} nameig={nameIG} />
      <Followers
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
