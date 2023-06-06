const Employees = require("../../models/Employees");

const getEmployeesByEmail = async (Email) => {
  const regex = new RegExp(Email, "i");
  const employ = await Employees.find({ email: { $regex: regex } });
  return employ;
};

module.exports = getEmployeesByEmail;
