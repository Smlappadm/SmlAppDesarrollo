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
    leadQuery["name"] = body.email;
  }
  if (email) {
    leadQuery["email"] = body.email;
  }
  if (birthdate) {
    leadQuery["birthdate"] = body.email;
  }
  if (photo) {
    leadQuery["photo"] = body.email;
  }
  if (country) {
    leadQuery["country"] = body.email;
  }
  if (contactNumber) {
    leadQuery["contactNumber"] = body.email;
  }
  if (rol) {
    leadQuery["rol"] = body.email;
  }
  if (description) {
    leadQuery["description"] = body.email;
  }
  if (deleted) {
    leadQuery["deleted"] = body.email;
  }



  const freelancer = await Freelancer.create({leadQuery});
  return freelancer;
};

module.exports = postFreelancer;
