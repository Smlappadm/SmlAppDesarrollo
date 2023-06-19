const Employees = require("../../models/Employees");

const getAllEmployees = async () => {
  const employees = await Employees.find({deleted: false});
  return employees;
};

module.exports = getAllEmployees;
