const Freelancer = require("../../models/Freelancer");

const updateFreelancerById = async (id, updatedData) => {
  const corredor = await Freelancer.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return corredor;
};

module.exports = updateFreelancerById;
