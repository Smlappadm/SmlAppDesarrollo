import React from "react";
import background from "../../Assets/borde1.png";
import background2 from "../../Assets/borde2.png";

export default function Guiones({ tamañoPantalla }) {
  const styles = () => {
    if (tamañoPantalla === "Pequeña") {
      return {
        backgroundImage: `url(${background2})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    }
  };

  return (
    <div className=" flex h-screen w-screen" style={styles()}>
      Guiones
    </div>
  );
}
