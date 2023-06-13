import React from "react";
import Followers from "./Followers/Followers";

export default function LandingClient() {
  return (
    <div className="border-2 flex justify-center items-center w-full h-screen ">
      <Followers number={5.523} maxNumber={`10K`}/>
    </div>
  );
}
