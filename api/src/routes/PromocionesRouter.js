const { Router } = require("express");
const { getAllPromocionesHandler } = require("../Handlers/PromocionesHandlers");
const PromocionesRouter = Router();

PromocionesRouter.get("/", getAllPromocionesHandler);

module.exports = PromocionesRouter;
