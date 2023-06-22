import React, { useEffect, useState } from "react";
import CustomsLabelAvances from "./CustomsLabelAvances/CustomsLabelAvances";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { getClientByEmail, updateClientProfile } from "../../redux/actions";

export default function Avances() {
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
    if (isSavingChanges && savedBody) {
      // Enviar la solicitud para actualizar el perfil del cliente y luego obtener el cliente por su correo electrónico
      dispatch(updateClientProfile(userEmail, savedBody)).then(() => {
        dispatch(getClientByEmail(userEmail && userEmail));
      });

      // Restablecer el estado de guardando cambios
      setIsSavingChanges(false);
    }
  }, [isSavingChanges, dispatch, userEmail, savedBody]);

  useEffect(() => {
    // Actualizar los avances cuando el estado del cliente cambie
    const avances = [
      {
        texto: "Videos Publicados",
        sumaTotal: client.videosPublicadosAnteriores,
        suma: client.videosPublicados - client.videosPublicadosAnteriores,
        value: client.videosPublicados,
      },
      {
        texto: "Seguidores Ganados",
        sumaTotal: client.seguidoresGanadosAnteriores,
        suma: client.seguidoresGanados - client.seguidoresGanadosAnteriores,
        value: client.seguidoresGanados,
      },
      {
        texto: "Videos Acumulados",
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
  }, [
    client,
    client.videosPublicados,
    client.seguidoresGanados,
    client.videosAcumulados,
    client.meGustaAcumulados,
  ]);

  useEffect(() => {
    // Obtener el cliente por su correo electrónico cuando se monte el componente
    dispatch(getClientByEmail(userEmail && userEmail));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-96 mt-8">
      <div
        onClick={handleSaveChanges}
        className="bg-[#8C4EB0] text-white rounded-full px-5 py-2 cursor-pointer"
      >
        Actualizar valores
      </div>
      <div className="flex justify-between w-10/12">
        <h1 className="text-white text-18">Avances</h1>
        <select className="bg-transparent focus:border-none">
          <option value="">desde siempre</option>
        </select>
      </div>
      <div>
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
