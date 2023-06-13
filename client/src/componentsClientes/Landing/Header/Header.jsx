import React from "react";
import { Link } from "react-router-dom";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";
import CircularProgressBar from "../CircularProgressbar/CircularProgressbar";

export default function Header() {
  const customValue = 75;
  const imgInstagram = "https://i.postimg.cc/tT405K0C/image.png";
  return (
    <div className="flex flex-row justify-between p-4 w-screen">
      <div>
        <img
          className="w-[5rem]"
          src="https://i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp"
          alt=""
        />
      </div>
      <div className="pt-10">
        <div>
          <div className="">
            <CircularProgressBar value={customValue} imageSrc={imgInstagram} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-row gap-2">
          <Link to="/clientes-addvideos">
            <IoAdd className="font-bold" color="#fff" size={30} />
          </Link>
          <Link to="/clientes-settings">
            <IoSettingsOutline className="font-bold" color="#fff" size={26} />
          </Link>
        </div>
        <p className="font-bold">53.5%</p>
      </div>
    </div>
  );
}
