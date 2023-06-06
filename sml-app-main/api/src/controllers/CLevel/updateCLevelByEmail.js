const CLevel = require("../../models/CLevel");

const updateCLevelByEmail = async (email, updatedData) => {
  const cLevel = await CLevel.findOneAndUpdate(email, updatedData, {
    new: true,
  });
  return cLevel;
};

module.exports = updateCLevelByEmail;
