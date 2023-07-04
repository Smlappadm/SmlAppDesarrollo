const postInfoPago = require("../controllers/Pagos/postInfoPago");



const updatePagosInfoHandler = async (req, res) => {
  const info = req.body.info.data.object.billing_details;
  console.log(info)

  try {
    const infoSave = await postInfoPago(info);
    res.status(200).json(infoSave);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {updatePagosInfoHandler}

