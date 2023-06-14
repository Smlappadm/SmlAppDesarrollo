import React from "react";
import { useUser } from "@clerk/clerk-react";

export default function Name() {
  const user = useUser().user;
  const name = user.fullName;

  console.log(user);

  return (
    <div className="flex flex-col gap-1 mt-5 justify-center items-center">
      <span className="text-white font-bold text-3xl">{name}</span>
      <span className="text-xl">@jonavoe</span>
    </div>
  );
}
