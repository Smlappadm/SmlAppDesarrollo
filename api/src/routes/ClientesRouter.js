const { Router } = require("express");
const {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
} = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();

ClientesRouter.post("/new", newClientHandler);
ClientesRouter.get("/username", loginClientHandler);
ClientesRouter.get("/", getAllClientesHandler);
ClientesRouter.put("/update", updateClientProfileHandler);

module.exports = ClientesRouter;
