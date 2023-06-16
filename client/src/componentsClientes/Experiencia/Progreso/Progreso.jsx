import React, { useEffect, useState } from "react";
import LinearDeterminate from "./LinearDeterminate";

export default function Progreso() {
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState(5000);

  React.useEffect(() => {
    setProgress(0);
    if (progress >= goals) {
      setGoals(goals + 5000);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-[#404062] w-10/12 h-20 rounded-xl">
      <div className="flex w-full justify-end items-center gap-5 mr-10">
        <label htmlFor="" className="text-green-400 font-semibold">
          +505
        </label>
        <label htmlFor="" className="font-bold text-24 text-white">
          {progress}
        </label>
        <label htmlFor="" className="font-bold text-24">
          / {goals}
        </label>

        <label htmlFor="" className="text-red-400 font-semibold">
          {5000 - progress}
        </label>
      </div>
      <div className="w-full flex justify-center">
        <LinearDeterminate value={progress} minValue={0} maxValue={5000} />
      </div>
    </div>
  );
}
