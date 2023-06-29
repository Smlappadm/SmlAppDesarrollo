import React from "react";
import FollowersDesktop from "./FollowersDesktop/FollowersDesktop";
import NameDesktop from "./NameDesktop/NameDesktop";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

export default function LandingClientDesktop({
  imgInstagram,
  setMaxNumber,
  numberTotal,
  name,
  setName,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  return (
    <div>
      <HeaderDesktop
        numberTotal={numberTotal}
        setMaxNumber={setMaxNumber}
        imgInstagram={imgInstagram}
      />
      {/* <NameDesktop name={name} setName={setName} 
        numberTotal={numberTotal} 
        imgInstagram={imgInstagram}/> */}
      <FollowersDesktop name={name} setName={setName} 
        numberTotal={numberTotal} 
        imgInstagram={imgInstagram}
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
