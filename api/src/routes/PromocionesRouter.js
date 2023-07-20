const { Router } = require("express");
const {
  getAllPromocionesHandler,
  postPromocionesHandler,
  updatePromocionByIdHandler,
} = require("../Handlers/PromocionesHandlers");
const PromocionesRouter = Router();

PromocionesRouter.get("/", getAllPromocionesHandler);
PromocionesRouter.post("/", postPromocionesHandler);
PromocionesRouter.put("/:id", updatePromocionByIdHandler);

module.exports = PromocionesRouter;
