const { Router } = require("express");
const {
  postFreelancerHandler,
  getAllFreelancerHandler,
  getLeadCheckedFreelanceHandler
} = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);
FreelancerRouter.get("/", getAllFreelancerHandler);
FreelancerRouter.put("/checkedfreelance", getLeadCheckedFreelanceHandler);

module.exports = FreelancerRouter;
