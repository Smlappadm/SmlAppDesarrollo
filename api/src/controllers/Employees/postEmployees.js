const Employees = require("../../models/Employees");

const postEmployees = async ({
  name,
  email,
  rol,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  deleted,
}) => {
  const employees = await Employees.create({
    name,
    email,
    rol,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    deleted,
  });
  return employees;
};

module.exports = postEmployees;
