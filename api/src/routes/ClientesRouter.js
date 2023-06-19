const { Router } = require("express");
const {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
  getClientByEmailHandler,
  paymentClienteHandler
} = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();


ClientesRouter.post("/new", newClientHandler);
ClientesRouter.get("/username", loginClientHandler);
ClientesRouter.get("/user", getClientByEmailHandler);
ClientesRouter.get("/", getAllClientesHandler);
ClientesRouter.put("/update", updateClientProfileHandler);
ClientesRouter.post("/payment", paymentClienteHandler);

module.exports = ClientesRouter;
