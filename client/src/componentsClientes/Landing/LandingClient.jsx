import React from "react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";

export default function LandingClient() {
  return (
    <div>
      <Header />
      <Name />
      <div className="flex jus">
        <Followers
          numberInstagram={2725}
          numberTiktok={2500}
          maxNumber={`10K`}
        />
      </div>
    </div>
  );
}
