import React from "react";

export default function HistoryVideos({ videosPublicados }) {
  return (
    <div className="w-96 bg-[#2c2c2c] mt-4 rounded-lg px-4 mx-4">
      <p className="text-24 font-extrabold text-white mt-4 text-center">
        Historial
      </p>
      <div>
        {videosPublicados ? (
          <div>
            {videosPublicados.map((link, index) => (
              <div className="my-2  ">
                <p key={index}>{link}</p>
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
