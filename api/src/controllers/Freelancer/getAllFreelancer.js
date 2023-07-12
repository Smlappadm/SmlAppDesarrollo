const Freelancer = require("../../models/Freelancer");

const getAllFreelancers = async () => {
  const freelancer = await Freelancer.find();

  return freelancer;
};

module.exports = getAllFreelancers;
