const Clientes = require("../../models/Clientes");

const updateClientProfile = async (email, body) => {
  const client = await Clientes.findOneAndUpdate(
    { email },
    body,
    {
      new: true,
    }
    // {
    //   username: body.username && body.username,
    //   photo: body.photo && body.photo,
    //   instagram: body.instagram && body.instagram,
    //   tiktok: body.tiktok && body.tiktok,
    //   drive: body.drive && body.drive,
    //   phone: body.phone && body.phone,
    //   country: body.country && body.country,
    //   videosPublicados: body.videosPublicados && body.videosPublicados,
    //   videosPublicadosAnterior: body.videosPublicadosAnteriores && body.videosPublicadosAnteriores,
    //   seguidoresGanados: body.seguidoresGanados && body.seguidoresGanados,
    //   seguidoresGanadosAnteriores: body.seguidoresGanadosAnteriores && body.seguidoresGanadosAnteriores,
    //   videosAcumulados: body.videosAcumulados && body.videosAcumulados,
    //   videosAcumuladosAnteriores: body.videosAcumuladosAnteriores && body.videosAcumuladosAnteriores,
    //   meGustaAcumulados: body.meGustaAcumulados && body.meGustaAcumulados,
    //   meGustaAcumuladosAnteriores: body.meGustaAcumuladosAnteriores && body.meGustaAcumuladosAnteriores,
    // }
  );
  return client;
};

module.exports = updateClientProfile;
