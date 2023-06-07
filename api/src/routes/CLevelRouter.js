const { Router } = require("express");
const {
  postCLevelHandler,
  updateCLevelHandler,
  getCLevelByIdHandler,
  getCLevelByNameHandler,
  getAllCLevelsHandler,
} = require("../Handlers/cLevelHandlers");
const CLevelRouter = Router();

CLevelRouter.post("/", postCLevelHandler);
CLevelRouter.get("/", getAllCLevelsHandler);
CLevelRouter.get("/name", getCLevelByNameHandler);
CLevelRouter.get("/:id", getCLevelByIdHandler);
CLevelRouter.put("/", updateCLevelHandler);

module.exports = CLevelRouter;
