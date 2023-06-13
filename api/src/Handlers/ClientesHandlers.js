const newClient = require("../controllers/Clientes/newClient");
const loginClient = require("../controllers/Clientes/loginClient");

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

module.exports = { newClientHandler, loginClientHandler };
