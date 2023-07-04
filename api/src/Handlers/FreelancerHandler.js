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

module.exports = { postFreelancerHandler };
