import { motion } from "framer-motion";
import React from "react";
import { IoGrid, IoStatsChart } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

const NavBar = () => {
  const [dashboard, setDashboard] = React.useState(false);
  const [historial, setHistorial] = React.useState(false);
  const [analiticas, setAnaliticas] = React.useState(false);

  const handleMouseEnterD = () => {
    setDashboard(true);
  };

  const handleMouseLeaveD = () => {
    setDashboard(false);
  };
  const handleMouseEnterH = () => {
    setHistorial(true);
  };

  const handleMouseLeaveH = () => {
    setHistorial(false);
  };
  const handleMouseEnterA = () => {
    setAnaliticas(true);
  };

  const handleMouseLeaveA = () => {
    setAnaliticas(false);
  };

  return (
    <div className="flex gap-2 w-[8rem]">
      <div className="flex gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }} // Aumentar el tamaño al pasar el mouse por encima
          className="text-[2rem] text-[#ae2dff] hover:text-[#af4fff] transition-transform"
          onMouseEnter={handleMouseEnterD}
          onMouseLeave={handleMouseLeaveD}
        >
          <IoGrid />
        </motion.div>
        {dashboard && (
          <motion.p
            initial={{ opacity: 0 }} // La opacidad inicial será 0
            animate={{ opacity: 1 }} // La opacidad al pasar el mouse por encima será 1
            className="group-hover:opacity-100 transition-opacity"
          >
            Dashboard
          </motion.p>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }} // Aumentar el tamaño al pasar el mouse por encima
          className="text-[2rem] text-[#ae2dff] hover:text-[#af4fff] transition-transform"
          onMouseEnter={handleMouseEnterH}
          onMouseLeave={handleMouseLeaveH}
        >
          <FaHistory />
        </motion.div>
        {historial && (
          <motion.p
            initial={{ opacity: 0 }} // La opacidad inicial será 0
            animate={{ opacity: 1 }} // La opacidad al pasar el mouse por encima será 1
            className="group-hover:opacity-100 transition-opacity"
          >
            Historial
          </motion.p>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }} // Aumentar el tamaño al pasar el mouse por encima
          className="text-[2rem] text-[#ae2dff] hover:text-[#af4fff] transition-transform"
          onMouseEnter={handleMouseEnterA}
          onMouseLeave={handleMouseLeaveA}
        >
          <IoStatsChart />
        </motion.div>
        {analiticas && (
          <motion.p
            initial={{ opacity: 0 }} // La opacidad inicial será 0
            animate={{ opacity: 1 }} // La opacidad al pasar el mouse por encima será 1
            className="group-hover:opacity-100 transition-opacity"
          >
            Analiticas
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
