import React from "react";

export default function CustomsLabelAvances({ text, suma, value }) {
  return (
    <div className="flex justify-between gap-5 items-center rounded-xl py-4 my-2 bg-[#39394b]">
      <p className="text-[#fff] font-bold">{text}</p>
      <div className="flex  gap-2">
        <p className="text-[#fff] font-bold">{suma}</p>
        <p className="text-[#fff] font-bold mr-5">{value}</p>
      </div>
    </div>
  );
}
