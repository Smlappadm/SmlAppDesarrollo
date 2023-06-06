const getAllLeads = require("../controllers/Lead/getAllLeads");
const getLeadChecked = require("../controllers/Lead/getLeadChecked");
const getLeadById = require("../controllers/Lead/getLeadById");
const getLeadByName = require("../controllers/Lead/getLeadByName");
const postLead = require("../controllers/Lead/postLead");
const updateLeadById = require("../controllers/Lead/updateLeadById");
const getLeadUnchecked = require("../controllers/Lead/getLeadUnchecked");
const getLeadCheckedInactive5 = require("../controllers/Lead/getLeadCheckedInactive5");
const getLead10Unchecked = require("../controllers/Lead/getLead10Unchecked");
const updateLeadVendedorById = require("../controllers/Lead/updateLeadVendedorById");
const getLeadVendedorById = require("../controllers/Lead/getLeadVendedorById");
const getLeadCorredorChecked = require("../controllers/Lead/getLeadCorredoresChecked");
const limpiezaBaseFunction = require("../controllers/Lead/limpiezaBaseFunction");
const findLeadCorredorName = require("../controllers/Lead/findLeadCorredorName");
const findLeadVendedorName = require("../controllers/Lead/findLeadVendedorName");
const getAllProfession = require("../controllers/Lead/getAllProfesion");
const getAllCountry = require("../controllers/Lead/getAllCountry");

const getAllLeadHandler = async (req, res) => {
  try {
    const lead = await getAllLeads();
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllProfesionHandler = async (req, res) => {
  try {
    const profesion = await getAllProfession();
    res.status(200).json(profesion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllCountriesHandler = async (req, res) => {
  try {
    const country = await getAllCountry();
    res.status(200).json(country);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadUncheckedHandler = async (req, res) => {
  try {
    const leadUnchecked = await getLeadUnchecked();
    res.status(200).json(leadUnchecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLead10UncheckedHandler = async (req, res) => {
  const { query } = req;
  try {
    const leadUnchecked = await getLead10Unchecked(query);
    res.status(200).json(leadUnchecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadCheckedHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadChecked();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadCheckedInactive5Handler = async (req, res) => {
  const { email } = req.query;

  try {
    const leadCheckedInactive5 = await getLeadCheckedInactive5(email);

    res.status(200).json(leadCheckedInactive5);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postLeadHandler = async (req, res) => {
  const data = req.body;
  try {
    const lead = await postLead(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateLeadHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const lead = await updateLeadById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateLeadVendedorHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const lead = await updateLeadVendedorById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const lead = await getLeadByName(Name);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const lead = await getLeadById(id);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getLeadVendedorHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const lead = await getLeadVendedorById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadCorredorCheckedHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const leadChecked = await getLeadCorredorChecked(email);
    res.status(200).json(leadChecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadCorredorNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const foundCorredor = await findLeadCorredorName(name);
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadVendedorNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const foundCorredor = await findLeadVendedorName(name);
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const limpiezaBaseHandler = async (req, res) => {
  try {
    const clean = await limpiezaBaseFunction();
    res.status(200).json(clean);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllLeadHandler,
  getLeadUncheckedHandler,
  getLeadCheckedHandler,
  getLeadCheckedInactive5Handler,
  postLeadHandler,
  updateLeadHandler,
  getLead10UncheckedHandler,
  getLeadByIdHandler,
  getLeadByNameHandler,
  updateLeadVendedorHandler,
  getLeadVendedorHandler,
  getLeadCorredorCheckedHandler,
  limpiezaBaseHandler,
  findLeadCorredorNameHandler,
  findLeadVendedorNameHandler,
  getAllProfesionHandler,
  getAllCountriesHandler,
};
