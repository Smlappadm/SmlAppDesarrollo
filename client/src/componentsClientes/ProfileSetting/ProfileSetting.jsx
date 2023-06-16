import React from "react";

export default function ProfileSetting(handleProfileSetting) {
  return (
    <div className=" flex mb-4 items-end justify-between pt-4">
      <h2 className="font-bold">Ajustes de Perfil</h2>
      <button
        onClick={handleProfileSetting}
        className="font-bold  md:border-2 md:border-[#211f52] md:rounded-lg hover:bg-[#2a286e] "
      >
        <IoCloseSharp className="font-bold text-[#fff] text-[2rem]" />
      </button>
    </div>
  );
}
