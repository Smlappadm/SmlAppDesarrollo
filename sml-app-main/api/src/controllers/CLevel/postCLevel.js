const CLevel = require("../../models/CLevel");

const postCLevel = async ({
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
  const cLevel = await CLevel.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    rol,
    deleted,
  });
  return cLevel;
};

module.exports = postCLevel;
