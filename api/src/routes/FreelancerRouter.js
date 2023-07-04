const { Router } = require("express");
const { postFreelancerHandler } = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);

module.exports = FreelancerRouter;
