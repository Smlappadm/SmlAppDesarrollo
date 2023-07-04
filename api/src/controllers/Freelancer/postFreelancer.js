const Freelancer = require("../../models/Freelancer");

const postFreelancer = async ({
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
  const freelancer = await Freelancer.create({
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
  return freelancer;
};

module.exports = postFreelancer;
