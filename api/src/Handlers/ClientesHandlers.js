const newClient = require("../controllers/Clientes/newClient");
const loginClient = require("../controllers/Clientes/loginClient");
const getAllClientes = require("../controllers/Clientes/getAllClients");
const updateClientProfile = require("../controllers/Clientes/updateClientProfile");
const getClientByEmail = require("../controllers/Clientes/getClientByEmail");
const createPayment = require("../controllers/Clientes/createPayment");
const createPaymentVendedor = require("../controllers/Clientes/createPaymentVendedor");
const setReferred = require("../controllers/Clientes/setReferred");
const addVideos = require("../controllers/Clientes/addVideos");

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
  const { id, name, monto, cuotas, cuotasRestantes, valorCuota } = req.body;
  try {
    const pago = await createPayment({ id, name, monto, cuotas, cuotasRestantes, valorCuota});
    res.status(200).json(pago);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const paymentClienteVendedoresHandler = async (req, res) => {
  const { id, name, monto, cuotas, cuotasRestantes, valorCuota, link, email} = req.body;
  try {
    const pago = await createPaymentVendedor({ id, name, monto, cuotas, cuotasRestantes, valorCuota, link, email});
    res.status(200).json(pago);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const paymentCompletedClienteHandler = async (req, res) => {
  // const event = req.body;
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  // // console.log(event)
  // const paymentSessionId = req.body.data.object.id;
  // console.log(paymentSessionId)
  // try {
  //   const pago = await createPaymentCompleted({ id, name, monto, cuotas, cuotasRestantes, valorCuota });
  //   res.status(200).json(pago);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

const setReferredHandler = async (req, res) => {
  const body = req.body;
  try {
    const referred = await setReferred(body);
    res.status(200).json(referred);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const addVideosHandler = async (req, res) => {
  const { videosPublicados } = req.body;
  const { email } = req.query;
  console.log(videosPublicados);
  console.log(email);
  try {
    const newVideo = await addVideos(email, videosPublicados);
    res.status(200).json(newVideo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
  paymentCompletedClienteHandler,
  paymentClienteVendedoresHandler,
  getClientByEmailHandler,
  paymentClienteHandler,
  setReferredHandler,
  addVideosHandler,
};
