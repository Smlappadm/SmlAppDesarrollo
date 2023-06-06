const Corredor = require("../../models/Corredor");

const postCorredor = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  classifications,
  average_delay,
  incidences,
  hired_leads,
  rol,
  deleted,
}) => {
  const corredor = await Corredor.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    classifications,
    average_delay,
    incidences,
    hired_leads,
    rol,
    deleted,
  });
  return corredor;
};

module.exports = postCorredor;
