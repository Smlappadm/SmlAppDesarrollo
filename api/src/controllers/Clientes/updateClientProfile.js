const Clientes = require("../../models/Clientes");

const updateClientProfile = async (email, body) => {
  const client = await Clientes.findOneAndUpdate(
    { email },
    {
      username: body.username && body.username,
      photo: body.photo && body.photo,
      instagram: body.instagram && body.instagram,
      tiktok: body.tiktok && body.tiktok,
      drive: body.drive && body.drive,
    }
  );
  console.log(client);
  return client;
};

module.exports = updateClientProfile;
