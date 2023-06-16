import React from "react";

export default function Name({name}) {

  return (
    <div className="flex flex-col gap-1 mt-5 justify-center items-center">
      <span className="text-white font-bold text-3xl">{name}</span>
      <span className="text-xl">@jonavoe</span>
    </div>
  );
}
