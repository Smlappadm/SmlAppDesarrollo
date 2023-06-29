import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryVideos({ videosPublicados }) {
  const [reverse, setReverse] = useState([]);
  useEffect(() => {
    setReverse(videosPublicados && videosPublicados.reverse());
  }, [videosPublicados]);
  return (
    <div className="w-96 bg-[#2c2c2c] mt-4 rounded-lg px-4 mx-4 flex flex-col items-center">
      <p className="text-24 font-extrabold text-white  text-center">
        Historial
      </p>
      <div>
        {videosPublicados && videosPublicados[0] ? (
          <div>
            {reverse &&
              reverse.map((video, index) => (
                <div key={index} className="my-2 text-ellipsis w-96 px-4">
                  <Link to={video.link} target="_blank">
                    <p className="text-center">
                      -
                      {video.link.slice(12, 13) === "i"
                        ? "Instagram"
                        : "Tiktok"}
                      -
                    </p>
                  </Link>
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
