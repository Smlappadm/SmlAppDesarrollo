import React from "react";

export default function Followers({ number, maxNumber }) {
  return (
    <div className="flex flex-col justify-start items-center w-fit h-fit">
      <div>
        <label htmlFor="" className="text-[45px] text-white font-medium px-2">
          {number}
        </label>
        <label htmlFor="">/ {maxNumber}</label>
      </div>
      <div className="">
        <label htmlFor="" className="font-thin">
          followers
        </label>
      </div>
    </div>
  );
}
