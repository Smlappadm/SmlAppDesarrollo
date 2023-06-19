const Employees = require("../../models/Employees");

const updateBannedEmploy = async (email, updatedData) => {
  const employ = await Employees.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return employ;
};

module.exports = updateBannedEmploy;
