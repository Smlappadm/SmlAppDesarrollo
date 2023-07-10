const { Router } = require("express");
const {
  postFreelancerHandler,
  getAllFreelancerHandler,
  getLeadCheckedFreelanceHandler,
  getAllFreelancersHandler,
} = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);
FreelancerRouter.get("/", getAllFreelancerHandler);
FreelancerRouter.get("/one", getAllFreelancersHandler);
FreelancerRouter.put("/checkedfreelance", getLeadCheckedFreelanceHandler);

module.exports = FreelancerRouter;
