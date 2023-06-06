const getAllCorredores = require("../controllers/Corredor/getAllCorredores");
const getCorredorById = require("../controllers/Corredor/getCorredorById");
const getCorredorByName = require("../controllers/Corredor/getCorredorByEmail");
const getValueLead = require("../controllers/Corredor/getValueLeads");
const postCorredor = require("../controllers/Corredor/postCorredor");
const putCorredorLead = require("../controllers/Corredor/putCorredorLead");
const updateCorredorById = require("../controllers/Corredor/updateCorredorById");
const getCorredorByEmail = require("../controllers/Corredor/getCorredorByEmail");
const putCorredorLeadChecked = require("../controllers/Corredor/putCorredorLeadChecked");

const getAllCorredoresHandler = async (req, res) => {
  try {
    const corredores = await getAllCorredores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getValueLeadsHandler = async (req, res) => {
  try {
    const corredores = await getValueLead();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postCorredorHandler = async (req, res) => {
  const data = req.body;

  try {
    const corredores = await postCorredor(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const putCorredorLeadHandler = async (req, res) => {
  const email = req.query.email;
  const leadUnchecked10 = req.body;

  try {
    const employ = await putCorredorLead(email, leadUnchecked10);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const putCorredorLeadCheckedHandler = async (req, res) => {
  const email = req.query.email;
  const leadChecked = req.body;

  try {
    const employ = await putCorredorLeadChecked(email, leadChecked);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCorredorHandler = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const corredores = await updateCorredorById(id, updatedData);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCorredorByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const leads = await getCorredorByEmail(email);
    const first10Leads = leads ? leads.slice(0, 10) : null;
    res.status(200).json(first10Leads);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCorredorByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const corredores = await getCorredorById(id);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllCorredoresHandler,
  postCorredorHandler,
  updateCorredorHandler,
  getCorredorByIdHandler,
  getCorredorByEmailHandler,
  putCorredorLeadHandler,
  getValueLeadsHandler,
  putCorredorLeadCheckedHandler,
};
