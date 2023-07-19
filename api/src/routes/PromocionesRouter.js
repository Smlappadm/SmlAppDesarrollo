const { Router } = require("express");
const {
  getAllPromocionesHandler,
  postPromocionesHandler,
} = require("../Handlers/PromocionesHandlers");
const PromocionesRouter = Router();

PromocionesRouter.get("/", getAllPromocionesHandler);
PromocionesRouter.post("/", postPromocionesHandler);

module.exports = PromocionesRouter;
