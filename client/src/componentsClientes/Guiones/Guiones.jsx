import React from "react";
import background from "../../Assets/borde1.png";

export default function Guiones() {
  const styles = () => {
    if (tamañoPantalla === "Grande") {
      return {
        backgroundImage: `url(${background})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return null;
    }
  };

  return <div style={styles()}>Guiones</div>;
}
