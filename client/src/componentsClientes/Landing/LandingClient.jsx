import React from "react";
import Followers from "./Followers/Followers";

export default function LandingClient() {
  return (
    <div className="">
      <Followers numberInstagram={2725} numberTiktok={2500} maxNumber={`10K`}/>
    </div>
  );
}
