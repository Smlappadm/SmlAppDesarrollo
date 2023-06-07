const getAllCLevels = require("../controllers/CLevel/getAllCLevels");
const getCLevelById = require("../controllers/CLevel/getCLevelById");
const getCLevelByName = require("../controllers/CLevel/getCLevelByName");
const postCLevel = require("../controllers/CLevel/postCLevel");
const updateCLevelByEmail = require("../controllers/CLevel/updateCLevelByEmail");

const getAllCLevelsHandler = async (req, res) => {
  try {
    const cLevels = await getAllCLevels();
    res.status(200).json(cLevels);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postCLevelHandler = async (req, res) => {
  const data = req.body;
  try {
    const cLevel = await postCLevel(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCLevelHandler = async (req, res) => {
  const email = req.params.email;
  const updatedData = req.body;

  try {
    const cLevel = await updateCLevelByEmail(email, updatedData);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCLevelByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const cLevel = await getCLevelByName(Name);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCLevelByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const cLevel = await getCLevelById(id);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllCLevelsHandler,
  postCLevelHandler,
  updateCLevelHandler,
  getCLevelByIdHandler,
  getCLevelByNameHandler,
};
