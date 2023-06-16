import React, { useEffect, useState } from "react";
import Nivel from "./Nivel/Nivel";
import Progreso from "./Progreso/Progreso";

export default function Experiencia({ nivelPadre, setNivelPadre }) {
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState(100);
  const [nivel, setNivel] = useState(0);

  const subirXp = () => {
    setProgress(progress + 99);
  };
  useEffect(() => {
    if (progress >= goals) {
      setProgress(0);
      setNivel(nivel + 1);
      setNivelPadre(nivel + 1);
    }
  }, [subirXp, setNivelPadre]);

  return (
    <div className=" flex flex-col justify-center items-center gap-3 w-96  ">
      <h1 className=" text-white text-18 w-10/12 md:w-fit">Experiencia</h1>
      <button onClick={subirXp}>SubirXP</button>
      <Nivel nivel={nivel} />
      <Progreso goals={goals} progress={progress} />
    </div>
  );
}
