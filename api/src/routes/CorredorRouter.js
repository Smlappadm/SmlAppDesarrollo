const { Router } = require("express");
const {
  postCorredorHandler,
  getAllCorredoresHandler,
  updateCorredorHandler,
  getCorredorByIdHandler,
  putCorredorLeadHandler,
  getValueLeadsHandler,
  getCorredorByEmailHandler,
  putCorredorLeadCheckedHandler,
  updateCorredorByEmailHandler,
} = require("../Handlers/CorredorHandlers");
const { sendmail, sendHiringEmail } = require("../Handlers/sendmail");
const CorredorRouter = Router();

CorredorRouter.post("/", postCorredorHandler);
CorredorRouter.get("/", getAllCorredoresHandler);
CorredorRouter.get("/lead", getValueLeadsHandler);
CorredorRouter.get("/email", getCorredorByEmailHandler);
CorredorRouter.get("/:id", getCorredorByIdHandler);
CorredorRouter.put("/:id", updateCorredorHandler);
CorredorRouter.post("/sendmail", sendmail);
CorredorRouter.post("/sendHiringEmail", sendHiringEmail);
CorredorRouter.put("/email", putCorredorLeadHandler);
CorredorRouter.put("/checked", putCorredorLeadCheckedHandler);
CorredorRouter.put("/detail", updateCorredorByEmailHandler);

module.exports = CorredorRouter;
