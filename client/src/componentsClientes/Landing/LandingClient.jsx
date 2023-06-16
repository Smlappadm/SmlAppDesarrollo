import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";

export default function LandingClient() {
  const user = useUser().user;
  const nameUser = user.fullName;
  const imgUser = user.imageUrl;

  const [name, setName] = useState(nameUser);
  const [imgInstagram, setImgInstagram] = useState(imgUser);
  const [numberInstagram, setNumberInstagram] = useState(125);
  const [numberTiktok, setNumberTiktok] = useState(2200);
  const [numberTotal, setNumberTotal] = useState(2500);
  const [maxNumber, setMaxNumber] = useState("10K");

  useEffect(() => {
    setNumberTotal(numberTiktok + numberInstagram);
  }, [numberTiktok, numberInstagram]);

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
