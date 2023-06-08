const { Router } = require("express");
const {
  postLeaderHandler,
  getAllLeadersHandler,
  updateLeaderHandler,
  getLeaderByIdHandler,
  getLeaderByNameHandler,
  getLeaderByEmailHandler,
} = require("../Handlers/LeaderHandlers");
const {
  updateCorredorByEmailHandler,
} = require("../Handlers/CorredorHandlers");
const LeaderRouter = Router();

LeaderRouter.post("/", postLeaderHandler);
LeaderRouter.get("/", getAllLeadersHandler);
LeaderRouter.get("/email", getLeaderByEmailHandler);
LeaderRouter.get("/name", getLeaderByNameHandler);
LeaderRouter.get("/:id", getLeaderByIdHandler);
LeaderRouter.put("/:id", updateLeaderHandler);
LeaderRouter.put("/email", updateCorredorByEmailHandler);

module.exports = LeaderRouter;
