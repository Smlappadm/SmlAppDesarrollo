const { Router } = require("express");
const {
  postEmployeesHandler,
  getEmployeesByEmailHandler,
  updateEmployByEmailHandler,
  getAllEmployeesHandler,
  deleteEmployeesByEmailHandler,
} = require("../Handlers/employeesHandlers");
const EmployeesRouter = Router();

EmployeesRouter.get("/", getAllEmployeesHandler);
EmployeesRouter.post("/", postEmployeesHandler);
EmployeesRouter.get("/email", getEmployeesByEmailHandler);
EmployeesRouter.delete("/", deleteEmployeesByEmailHandler);
EmployeesRouter.put("/", updateEmployByEmailHandler);

module.exports = EmployeesRouter;
