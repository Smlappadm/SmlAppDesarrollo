const { Router } = require("express");
const {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
} = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();

ClientesRouter.post("/new", newClientHandler);
ClientesRouter.get("/username", loginClientHandler);
ClientesRouter.get("/", getAllClientesHandler);

module.exports = ClientesRouter;
