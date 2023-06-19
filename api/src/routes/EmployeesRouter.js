const { Router } = require("express");
const {
  postEmployeesHandler,
  getEmployeesByEmailHandler,
  updateEmployByEmailHandler,
  getAllEmployeesHandler,
  deleteEmployeesByEmailHandler,
  updateBannedEmployHandler,
  getEmployeesBannedHandler,
} = require("../Handlers/employeesHandlers");
const EmployeesRouter = Router();

EmployeesRouter.get("/", getAllEmployeesHandler);
EmployeesRouter.get("/banned", getEmployeesBannedHandler);
EmployeesRouter.post("/", postEmployeesHandler);
EmployeesRouter.get("/email", getEmployeesByEmailHandler);
EmployeesRouter.delete("/", deleteEmployeesByEmailHandler);
EmployeesRouter.put("/email", updateEmployByEmailHandler);
EmployeesRouter.put("/email/banned", updateBannedEmployHandler);

module.exports = EmployeesRouter;
