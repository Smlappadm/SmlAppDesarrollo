import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useClerk } from "@clerk/clerk-react";
import logo from "../../Assets/smllogo.png";
import {
  IoStatsChart,
  IoSettingsSharp,
  IoGrid,
  IoPeople,
  IoExitOutline,
  IoLogoSnapchat,
} from "react-icons/io5";

function Nav() {
  const { signOut } = useClerk();
  const roleReady = localStorage.getItem("roleReady");
  const isEmployee = localStorage.getItem("isEmployeeReady");

  const handleLogout = async () => {
    await signOut();
    localStorage.clear();
  };

  return (
    <div className="bg-[#39394B] flex flex-col justify-between items-center h-screen min-w-[190px]">
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col items-center justify-center">
          <Link to={"/protected"}>
            <img
              className="opacity-80 w-44"
              src={logo}
              // src="https://i.postimg.cc/Kvj4Yr5X/White-Logo-Social-Media-Lab.webp"
            />
          </Link>
        </div>

        {!isEmployee || !roleReady ? (
          <div className={styles.loader}></div>
        ) : (
          <div className=" flex  w-fit mt-4 ">
            {roleReady === "clevel" || roleReady === "leader" ? (
              <ul className="flex flex-col gap-2">
                <div className="flex flex-col gap-20">
                  <div>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoPeople className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/clevel"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Empleados
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/lideres"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </span>
                    </li>

                    <li className="flex gap-2 items-center text-[18px] text-white">
                      <span className="text-[1.5rem]">
                        <IoStatsChart className="w-4 text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/analytics"
                          className="text-[#e0dddd] hover:text-white"
                        >
                          Estadísticas
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/corredores"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Corredores
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/vendedores"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Vendedores
                        </Link>
                      </span>
                    </li>

                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoSettingsSharp className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/settings"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Configuración
                        </Link>
                      </span>
                    </li>
                  </div>

                  {/* <div>
                    <h2>Freelance</h2>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/clasificacion"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Clasificación
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoGrid className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/ventas-dashboard"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Ventas
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoLogoSnapchat className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/lideres-freelancer"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Historial
                        </Link>
                      </span>
                    </li>

                    <li className="flex gap-2 items-center text-[18px]">
                      <span className=" text-lg">
                        <IoSettingsSharp className="text-[#e0dddd]" />
                      </span>
                      <span>
                        <Link
                          to="/settings"
                          className=" text-[#e0dddd] hover:text-white"
                        >
                          Settings
                        </Link>
                      </span>
                    </li>
                  </div> */}
                </div>
              </ul>
            ) : roleReady === "vendedor" ? (
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/vendedores"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoStatsChart className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/vendedores-history"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Estadísticas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            ) : roleReady === "corredor" ? (
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/corredores"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px] text-white">
                  <span className="text-[1.5rem]">
                    <IoStatsChart className="w-4 text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/corredores-history"
                      className="text-[#e0dddd] hover:text-white"
                    >
                      Estadísticas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/clasificacion"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Clasificación
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoGrid className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/ventas-dashboard"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Ventas
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2 items-center text-[18px]">
                  <span className=" text-lg">
                    <IoSettingsSharp className="text-[#e0dddd]" />
                  </span>
                  <span>
                    <Link
                      to="/settings"
                      className=" text-[#e0dddd] hover:text-white"
                    >
                      Configuración
                    </Link>
                  </span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center w-full items-center mb-5">
        <Link to="/">
          <button onClick={handleLogout} className={styles.boton}>
            <IoExitOutline className={styles.icono} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
