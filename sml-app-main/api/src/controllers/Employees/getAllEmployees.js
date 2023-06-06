const Employees = require("../../models/Employees");

const getAllEmployees = async () => {
  const employees = await Employees.find();
  return employees;
};

module.exports = getAllEmployees;
