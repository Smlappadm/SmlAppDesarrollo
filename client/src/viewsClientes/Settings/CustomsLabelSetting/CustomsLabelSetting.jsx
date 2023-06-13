import React from "react";
import CustomizedSwitches from "./MUI/CustomizedSwitches";

export default function CustomsLabelSetting({ text, switchValue,invitar }) {
  return (
    <div className="flex justify-center gap-5 items-center rounded-xl py-4 my-2 bg-[#39394b]">
      <p className="text-[#fff] font-bold">{text}</p>
      {switchValue ? (
        <div className="">
          <CustomizedSwitches />
        </div>
      ) : null}
      {invitar ? (
        <div className="">
          <p>Invitar</p>
        </div>
      ) : null}
    </div>
  );
}
