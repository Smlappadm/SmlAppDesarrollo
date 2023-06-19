const newClient = require("../controllers/Clientes/newClient");
const loginClient = require("../controllers/Clientes/loginClient");
const getAllClientes = require("../controllers/Clientes/getAllClients");
const updateClientProfile = require("../controllers/Clientes/updateClientProfile");
const getClientByEmail = require("../controllers/Clientes/getClientByEmail");
const createPayment = require("../controllers/Clientes/createPayment")

const newClientHandler = async (req, res) => {
  const body = req.body;
  try {
    const client = await newClient(body);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const loginClientHandler = async (req, res) => {
  const { username } = req.query;
  try {
    const client = await loginClient(username);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getAllClientesHandler = async (req, res) => {
  try {
    const client = await getAllClientes();
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateClientProfileHandler = async (req, res) => {
  const { email } = req.query;
  const body = req.body;
  try {
    const client = await updateClientProfile(email, body);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getClientByEmailHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const client = await getClientByEmail(email);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const paymentClienteHandler = async (req, res) => {
  const {id, amount} = req.body
  try {
    const pago = await createPayment({id, amount});
    res.status(200).json({pago: pago, message: "Pay "});
  } catch (error) {
    res.status(404).json({ message: error.raw.message });
  }
};

module.exports = {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
  getClientByEmailHandler,
  paymentClienteHandler
};
