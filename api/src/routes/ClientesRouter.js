const { Router } = require("express");
const {
  newClientHandler,
  loginClientHandler,
} = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();

ClientesRouter.post("/new", newClientHandler);
ClientesRouter.get("/username", loginClientHandler);

module.exports = ClientesRouter;
