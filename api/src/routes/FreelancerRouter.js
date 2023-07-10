const { Router } = require("express");
const {
  postFreelancerHandler,
  getAllFreelancerHandler,
  getLeadCheckedFreelanceHandler,
  getFreelancerByEmailHandler,
} = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);
FreelancerRouter.get("/", getAllFreelancerHandler);
FreelancerRouter.get("/one", getFreelancerByEmailHandler);
FreelancerRouter.put("/checkedfreelance", getLeadCheckedFreelanceHandler);

module.exports = FreelancerRouter;
