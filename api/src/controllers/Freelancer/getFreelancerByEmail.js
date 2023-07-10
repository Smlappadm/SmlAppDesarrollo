const Freelancer = require("../../models/Freelancer");

const getFreelancerByEmail = async (email) => {
  const freelancer = await Freelancer.findOne({ email: email });
  return freelancer;
};

module.exports = getFreelancerByEmail;
