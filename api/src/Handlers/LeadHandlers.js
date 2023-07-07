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
const getLeadByEmailApp = require("../controllers/Lead/getLeadByEmailApp");
const getAllCountry = require("../controllers/Lead/getAllCountry");
const findLeadCorredorNameAllInfo = require("../controllers/Lead/findLeadCorredorNameAllInfo");
const getAllCategory = require("../controllers/Lead/getAllCategory");
const getCorredores = require("../controllers/Lead/getCorredores");
const changeLeadEmail = require("../controllers/Lead/changeLeadEmail");
const getVendedores = require("../controllers/Lead/getVendedores");
const findLeadVendedorNameAllInfo = require("../controllers/Lead/findLeadVendedorNameAllInfo");
const cleanValueClevel = require("../controllers/Lead/cleanValueClevel");
const getLeadDiscard = require("../controllers/Lead/getLeadDiscard");
const getAllLeadClasificacion = require("../controllers/Lead/getAllLeadClasificacion");
const dowloadCSV = require("../controllers/Lead/downloadCSV");
const findLeadFreelancerNameAllInfo = require("../controllers/Lead/findLeadFreelancerNameAllInfo");
const getLeadCheckedFreelancer = require("../controllers/Lead/getLeadCheckedFreelancer");
const getFreelancers = require("../controllers/Lead/getFreelancers");
const asignacionFreelancer = require("../controllers/Lead/asignacionFreelancer");
const findLeadFreelancerName = require("../controllers/Lead/findLeadFreelancerName");

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

const getCorredoresHandler = async (req, res) => {
  try {
    const corredores = await getCorredores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getFreelancersHandler = async (req, res) => {
  try {
    const corredores = await getFreelancers();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getVendedoresHandler = async (req, res) => {
  try {
    const corredores = await getVendedores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllCategoryHandler = async (req, res) => {
  try {
    const category = await getAllCategory();
    res.status(200).json(category);
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

const getLeadClasificacionHandler = async (req, res) => {
  const { query } = req;
  try {
    const leadClasificacion = await getAllLeadClasificacion(query);
    res.status(200).json(leadClasificacion);
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
const getLeadCheckedFreelancerHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadCheckedFreelancer();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getLeadDiscardHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadDiscard();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getLeadCheckedInactive5Handler = async (req, res) => {
  const body = req.body;

  try {
    const leadCheckedInactive5 = await getLeadCheckedInactive5(body);
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
const getLeadByEmailAppHandler = async (req, res) => {
  const { emailApp } = req.query;
  try {
    const lead = await getLeadByEmailApp(emailApp);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadCorredorNameHandler = async (req, res) => {
  const { name, month, year, fromDay, toDay } = req.query;
  try {
    const foundCorredor = await findLeadCorredorName(
      name,
      month,
      year,
      fromDay,
      toDay
    );
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadFreelancerNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const foundCorredor = await findLeadFreelancerName(name);
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadCorredorNameAllInfoHandler = async (req, res) => {
  const {
    corredor,
    vendedor,
    fromDay,
    toDay,
    profesion,
    country,
    category,
    level,
    status,
  } = req.query;
  try {
    const foundCorredor = await findLeadCorredorNameAllInfo(
      corredor,
      vendedor,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status
    );
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const findLeadFreelancerNameAllInfoHandler = async (req, res) => {
  const {
    freelancer,
    fromDay,
    toDay,
    profesion,
    country,
    category,
    level,
    status,
  } = req.query;
  try {
    const foundFreelancer = await findLeadFreelancerNameAllInfo(
      freelancer,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status
    );
    res.status(200).json(foundFreelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const findLeadVendedorNameAllInfoHandler = async (req, res) => {
  const { email, fromDay, toDay, profesion, country, category, level, status } =
    req.query;
  try {
    const foundVendedor = await findLeadVendedorNameAllInfo(
      email,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status
    );
    res.status(200).json(foundVendedor);
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
const updateChangeEmailHandler = async (req, res) => {
  const { id } = req.params;

  const keys = Object.keys(req.body);
  const newValue = Object.values(req.body);

  try {
    const leadEmailChanged = await changeLeadEmail(id, keys[0], newValue[0]);
    res.status(200).json(leadEmailChanged);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const dowloadCSVHandler = async (req, res) => {
  const niveles = req.query.nivel || [];
  try {
    const download = await dowloadCSV(niveles);
    res.status(200).json(download);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const cleanValueClevelHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const clevel = await cleanValueClevel(email);
    res.status(200).json(clevel);
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

const asignacionFreelancerHandler = async (req, res) => {
  const data = req.body
  try {
    const asignacion = await asignacionFreelancer(data);
    res.status(200).json(asignacion);
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
  getAllCategoryHandler,
  findLeadCorredorNameAllInfoHandler,
  findLeadVendedorNameAllInfoHandler,
  getCorredoresHandler,
  updateChangeEmailHandler,
  getVendedoresHandler,
  cleanValueClevelHandler,
  getLeadByEmailAppHandler,
  getLeadDiscardHandler,
  getLeadClasificacionHandler,
  dowloadCSVHandler,
  findLeadFreelancerNameAllInfoHandler,
  getLeadCheckedFreelancerHandler,
  getFreelancersHandler,
  asignacionFreelancerHandler,
  findLeadFreelancerNameHandler,
};
