import React from "react";

export default function HistoryVideos({ videosPublicados }) {
  return (
    <div className="w-96 bg-[#2c2c2c] mt-4 rounded-lg px-4 mx-4 flex flex-col items-center">
      <p className="text-24 font-extrabold text-white  text-center">
        Historial
      </p>
      <div>
        {videosPublicados && videosPublicados[0] ? (
          <div>
            {videosPublicados.map((link, index) => (
              <div key={index} className="my-2  ">
                <p>{link}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No se han cargado videos</p>
        )}
      </div>
    </div>
  );
}
