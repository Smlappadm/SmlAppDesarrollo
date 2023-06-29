const Clientes = require("../../models/Clientes");

const addVideos = async (email, linksVideos) => {
  const linked = await Clientes.findOne({
    email: email,
    "videosPublicados.link": linksVideos.link,
  });
  if (!linked) {
    const newVideo = await Clientes.findOneAndUpdate(
      { email: email },
      { $addToSet: { videosPublicados: linksVideos } },
      { new: true }
    );
    return newVideo;
  }
};
module.exports = addVideos;
