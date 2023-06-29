import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import igPng from "../../Assets/instagram.png";
import tkPng from "../../Assets/tik-tok.png";

export default function HistoryVideos({ videosPublicados }) {
  const [reverse, setReverse] = useState([]);

  useEffect(() => {
    setReverse(videosPublicados && videosPublicados.reverse());
  }, [videosPublicados]);

  const formatDateTime = (dateTime) => {
    const videoDate = new Date(dateTime);
    const formattedDate = `${videoDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(videoDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${videoDate.getFullYear().toString().slice(-2)}`;
    const formattedTime = `${videoDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${videoDate.getMinutes().toString().padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

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
                <div
                  key={index}
                  className="my-2 text-ellipsis w-96 px-4 flex justify-between items-center"
                >
                  <p>{formatDateTime(video.date)}</p>
                  <img
                    src={video.social === "Instagram" ? igPng : tkPng}
                    alt="tt"
                    className="w-6 h-6 mr-2"
                  />
                  <Link to={video.link} target="_blank" className="w-28">
                    <p className="text-center">
                      -{video.social === "Instagram" ? "Instagram" : "Tiktok"}-
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
