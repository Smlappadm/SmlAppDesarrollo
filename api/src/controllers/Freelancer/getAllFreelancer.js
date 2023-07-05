const Freelancer = require("../../models/Freelancer");

const getAllFreelancer = async () => {
  const freelancers = await Freelancer.find();
  return freelancers;
};

module.exports = getAllFreelancer;
