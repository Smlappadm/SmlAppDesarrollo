const { Router } = require("express");
const {
  postLeadHandler,
  getAllLeadHandler,
  updateLeadHandler,
  getLeadByIdHandler,
  getLeadByNameHandler,
  getLeadCheckedHandler,
  getLeadUncheckedHandler,
  getLead10UncheckedHandler,
  getLeadCheckedInactive5Handler,
  updateLeadVendedorHandler,
  getLeadVendedorHandler,
  getLeadCorredorCheckedHandler,
  limpiezaBaseHandler,
  findLeadCorredorNameHandler,
  findLeadVendedorNameHandler,
  getAllProfesionHandler,
  getAllCountriesHandler,
} = require("../Handlers/LeadHandlers");
const LeadRouter = Router();

LeadRouter.get("/", getAllLeadHandler);
LeadRouter.get("/profesion", getAllProfesionHandler);
LeadRouter.get("/country", getAllCountriesHandler);
LeadRouter.get("/corredor", findLeadCorredorNameHandler);
LeadRouter.get("/vendedor", findLeadVendedorNameHandler);
LeadRouter.put("/limpieza", limpiezaBaseHandler);
LeadRouter.get("/checked", getLeadCheckedHandler);
LeadRouter.get("/checkedinactive5", getLeadCheckedInactive5Handler);
LeadRouter.get("/unchecked", getLeadUncheckedHandler);
LeadRouter.get("/unchecked10", getLead10UncheckedHandler);
LeadRouter.get("/corredorchecked", getLeadCorredorCheckedHandler);
LeadRouter.get("/name", getLeadByNameHandler);
LeadRouter.get("/:id", getLeadByIdHandler);
LeadRouter.get("/leadvendedor/:id", getLeadVendedorHandler);
LeadRouter.post("/", postLeadHandler);
LeadRouter.put("/:id", updateLeadHandler);
LeadRouter.put("/vendedor/:id", updateLeadVendedorHandler);

module.exports = LeadRouter;
