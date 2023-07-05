const { Router } = require("express");
const {
  postFreelancerHandler,
  getAllFreelancerHandler,
} = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);
FreelancerRouter.get("/", getAllFreelancerHandler);

module.exports = FreelancerRouter;
