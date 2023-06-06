const Employees = require("../../models/Employees");

const deleteEmployByEmail = async (email) => {
  const employ = await Employees.findOneAndDelete({ email: email });
  return employ;
};

module.exports = deleteEmployByEmail;
