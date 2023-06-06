const deleteEmployByEmail = require("../controllers/Employees/deleteEmployByEmail");
const getAllEmployees = require("../controllers/Employees/getAllEmployees");
const getEmployeesByEmail = require("../controllers/Employees/getEmployByEmail");
const postEmployees = require("../controllers/Employees/postEmployees");
const updateEmployByEmail = require("../controllers/Employees/updateEmployByEmail");

const getAllEmployeesHandler = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postEmployeesHandler = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const Employees = await postEmployees(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getEmployeesByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const employ = await getEmployeesByEmail(email);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEmployeesByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const employ = await deleteEmployByEmail(email);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateEmployByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const employ = await updateEmployByEmail(email, updatedData);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postEmployeesHandler,
  getEmployeesByEmailHandler,
  updateEmployByEmailHandler,
  getAllEmployeesHandler,
  deleteEmployeesByEmailHandler,
};
