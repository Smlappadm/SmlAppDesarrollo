const Employees = require("../../models/Employees");

const getEmployeesBanned = async () => {
  const employees = await Employees.find({ deleted: true });
  return employees;
};

module.exports = getEmployeesBanned;
