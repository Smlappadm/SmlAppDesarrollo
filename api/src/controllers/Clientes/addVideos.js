const Clientes = require("../../models/Clientes");

const addVideos = async (email, linksVideos) => {
  const newVideo = await Clientes.findOneAndUpdate(
    { email: email },
    { $addToSet: { videosPublicados: linksVideos } },
    { new: true }
  );
  return newVideo;
};
module.exports = addVideos;
