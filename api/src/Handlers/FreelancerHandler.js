const getAllFreelancer = require("../controllers/Freelancer/getAllFreelancer");
const postFreelancer = require("../controllers/Freelancer/postFreelancer");

const postFreelancerHandler = async (req, res) => {
  const data = req.body;


  try {
    const freelancer = await postFreelancer(data);
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllFreelancerHandler = async (req, res) => {
  try {
    const freelancers = await getAllFreelancer();
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { postFreelancerHandler, getAllFreelancerHandler };
