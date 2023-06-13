import React from "react";
import Name from "./Name/Name";
import Header from "./Header/Header";
import Followers from "./Followers/Followers";

export default function LandingClient() {
  return (
    <div>
      <Header />
      <Name />
      <Followers />
    </div>
  );
}
