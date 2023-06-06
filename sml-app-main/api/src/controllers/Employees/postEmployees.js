const Employees = require("../../models/Employees");

const postEmployees = async ({ name, email, rol, deleted }) => {
  const employees = await Employees.create({
    name,
    email,
    rol,
    deleted,
  });
  return employees;
};

module.exports = postEmployees;
