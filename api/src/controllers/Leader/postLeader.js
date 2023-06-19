const Leader = require("../../models/Leader");

const postLeader = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  rol,
  deleted,
}) => {
  const leader = await Leader.create({
    name,
    email,
    birthdate: birthdate ?? "",
    photo: photo ?? "",
    country: country ?? "",
    contactNumber: contactNumber ?? "",
    description: description ?? "",
    rol,
    deleted,
  });
  return leader;
};

module.exports = postLeader;
