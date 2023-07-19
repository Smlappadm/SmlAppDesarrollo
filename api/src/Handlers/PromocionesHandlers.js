const getAllPromociones = require("../controllers/Promociones/getAllPromociones");

// Obtener todos los niveles CLevel
const getAllPromocionesHandler = async (req, res) => {
  try {
    const cLevels = await getAllPromociones();
    res.status(200).json(cLevels);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllPromocionesHandler,
};
