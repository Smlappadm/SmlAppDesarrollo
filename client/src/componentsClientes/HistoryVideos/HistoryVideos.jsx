import React from "react";

export default function HistoryVideos({ videosPublicados }) {
  return (
    <div className="w-96">
      <p className="text-24 font-extrabold text-white mt-4 text-center">
        Historial
      </p>
      <div>
        {videosPublicados ? (
          <div>
            {videosPublicados.map((link, index) => (
              <p key={index}>{link}</p>
            ))}
          </div>
        ) : (
          <p>nada</p>
        )}
      </div>
    </div>
  );
}
