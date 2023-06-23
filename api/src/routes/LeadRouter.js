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
  findLeadCorredorNameAllInfoHandler,
  getAllCategoryHandler,
  getCorredoresHandler,
  findLeadVendedorNameAllInfoHandler,
  getVendedoresHandler,
} = require("../Handlers/LeadHandlers");
const LeadRouter = Router();

LeadRouter.get("/", getAllLeadHandler);
LeadRouter.get("/profesion", getAllProfesionHandler);
LeadRouter.get("/allcorredor", getCorredoresHandler);
LeadRouter.get("/allvendedor", getVendedoresHandler);
LeadRouter.get("/category", getAllCategoryHandler);
LeadRouter.get("/country", getAllCountriesHandler);
LeadRouter.get("/corredor", findLeadCorredorNameHandler);
LeadRouter.get("/allinfo", findLeadCorredorNameAllInfoHandler);
LeadRouter.get("/allinfovendedor", findLeadVendedorNameAllInfoHandler);
LeadRouter.get("/vendedor", findLeadVendedorNameHandler);
LeadRouter.put("/limpieza", limpiezaBaseHandler);
LeadRouter.get("/checked", getLeadCheckedHandler);
LeadRouter.put("/checkedinactive5", getLeadCheckedInactive5Handler);
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
