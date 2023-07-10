const Freelancer = require("../../models/Freelancer");

const updateFreelancerByEmail = async (email, updatedData) => {
  const corredor = await Freelancer.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return corredor;
};

module.exports = updateFreelancerByEmail;
