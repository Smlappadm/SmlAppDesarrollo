const { Router } = require("express");
const { newClientHandler } = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();

ClientesRouter.post("/new", newClientHandler);

module.exports = ClientesRouter;
