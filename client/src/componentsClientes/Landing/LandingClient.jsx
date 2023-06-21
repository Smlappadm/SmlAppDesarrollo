import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";
import { useDispatch, useSelector } from "react-redux";
import { getClientByEmail } from "../../redux/actions";

export default function LandingClient() {
  const user = useUser().user;
  const imgUser = user.imageUrl;

  const { client } = useSelector((state) => state);
  const dispatch = useDispatch();
  const userEmail = user.emailAddresses[0].emailAddress;
  const [name, setName] = useState("");
  const [imgInstagram, setImgInstagram] = useState(imgUser);
  const [numberInstagram, setNumberInstagram] = useState(200);
  const [numberTiktok, setNumberTiktok] = useState(3300);
  const [numberTotal, setNumberTotal] = useState(2500);
  const [maxNumber, setMaxNumber] = useState("10K");

  useEffect(() => {
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  useEffect(() => {
    setName(client.username);
    setNumberTotal(numberTiktok + numberInstagram);
  }, [numberTiktok, numberInstagram, client]);

  return (
    <div>
      <Header
        numberTotal={numberTotal}
        setMaxNumber={setMaxNumber}
        imgInstagram={imgInstagram}
      />
      <Name name={name} setName={setName} />
      <Followers
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
