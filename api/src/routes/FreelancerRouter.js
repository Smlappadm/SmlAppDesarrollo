const { Router } = require("express");
const { postFreelancerHandler } = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/new", postFreelancerHandler);

module.exports = FreelancerRouter;
