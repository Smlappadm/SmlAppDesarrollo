import React, { useEffect, useState } from "react";
import CustomsLabelAvances from "./CustomsLabelAvances/CustomsLabelAvances";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { getClientByEmail, updateClientProfile } from "../../redux/actions";
import { IoReloadOutline } from "react-icons/io5";

export default function Avances({
  seguidores,
  seguidoresGanados,
  videosPublicados,
}) {
  // Estado local
  const [isSavingChanges, setIsSavingChanges] = useState(false); // Estado para guardar si se están guardando los cambios
  const [savedBody, setSavedBody] = useState(null); // Estado para guardar el cuerpo de la solicitud guardada

  // Hooks
  const user = useUser().user; // Obtener información del usuario actual usando Clerk
  const { client } = useSelector((state) => state); // Obtener el estado del cliente desde Redux
  const dispatch = useDispatch(); // Hook para enviar acciones a Redux
  const userEmail = user.emailAddresses[0].emailAddress; // Obtener el correo electrónico del usuario

  const [avances, setAvances] = useState([]); // Estado para guardar los avances

  // Manejar el evento de guardar cambios
  const handleSaveChanges = () => {
    // Valores nuevos para los avances
    const newVideosPublicados = 5;
    const newSeguidoresGanados = 1;
    const newVideosAcumulados = 1;
    const newMeGustaAcumulados = 1;

    // Crear el cuerpo de la solicitud
    const body = {
      videosPublicados: client.videosPublicados + newVideosPublicados,
      seguidoresGanados: client.seguidoresGanados + newSeguidoresGanados,
      videosAcumulados: client.videosAcumulados + newVideosAcumulados,
      meGustaAcumulados: client.meGustaAcumulados + newMeGustaAcumulados,
      videosPublicadosAnteriores: client.videosPublicados,
      seguidoresGanadosAnteriores: client.seguidoresGanados,
      videosAcumuladosAnteriores: client.videosAcumulados,
      meGustaAcumuladosAnteriores: client.meGustaAcumulados,
    };

    // Establecer el estado de guardando cambios y guardar el cuerpo
    setIsSavingChanges(true);
    setSavedBody(body);
  };

  useEffect(() => {
    // Obtener el cliente por su correo electrónico cuando se monte el componente
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  // useEffect(() => {
  //   if (isSavingChanges && savedBody) {
  //     // Enviar la solicitud para actualizar el perfil del cliente y luego obtener el cliente por su correo electrónico
  //     dispatch(updateClientProfile(userEmail, savedBody)).then(() => {
  //       dispatch(getClientByEmail(userEmail && userEmail));
  //     });
  //     // Restablecer el estado de guardando cambios
  //     // setIsSavingChanges(false);
  //   }
  // }, [isSavingChanges, dispatch, userEmail, savedBody]);

  useEffect(() => {
    // Actualizar los avances cuando el estado del cliente cambie
    const avances = [
      {
        texto: "Videos Publicados",
        sumaTotal: null,
        suma: null,
        value: videosPublicados && videosPublicados.length,
      },
      {
        texto: "Seguidores Ganados",
        sumaTotal: seguidoresGanados,
        value: seguidores,
      },
      {
        texto: "Visitas Acumulados",
        sumaTotal: client.videosAcumuladosAnteriores,
        suma: client.videosAcumulados - client.videosAcumuladosAnteriores,
        value: client.videosAcumulados,
      },
      {
        texto: "Me Gusta Acumulados",
        sumaTotal: client.meGustaAcumuladosAnteriores,
        suma: client.meGustaAcumulados - client.meGustaAcumuladosAnteriores,
        value: client.meGustaAcumulados,
      },
    ];

    // Actualizar el estado de los avances
    setAvances(avances);
  }, [client]);
  useEffect(() => {}, [avances]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-8">
      <div className="flex justify-between w-10/12">
        <h1 className="text-white text-18">Avances</h1>
        <div className="text-5xl rounded-full">
          <IoReloadOutline
            className="font-bold"
            color="#fff"
            size={25}
            onClick={handleSaveChanges}
          />
        </div>

        <select className="bg-transparent focus:border-none">
          <option value="">desde siempre</option>
        </select>
      </div>
      <div className="flex flex-col w-10/12">
        {avances &&
          avances.map((avance, index) => (
            <CustomsLabelAvances
              key={index}
              text={avance.texto}
              sumaTotal={avance.sumaTotal}
              suma={avance.suma}
              value={avance.value}
            />
          ))}
      </div>
    </div>
  );
}
