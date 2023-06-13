const newClient = require("../controllers/Clientes/newClient");

const newClientHandler = async (req, res) => {
  const body = req.body;
  try {
    const client = await newClient(body);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { newClientHandler };
