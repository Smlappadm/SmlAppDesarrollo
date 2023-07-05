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

  let leadQuery = {};

  if (name) {
    leadQuery["email"] = body.email;
  }



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
