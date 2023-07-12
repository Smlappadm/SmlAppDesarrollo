const Lead = require("../../models/Lead");

const updateLeadById = async (id, updatedData) => {
  const date = new Date();
  const formattedTime = date.toISOString();

  updatedData.updateCorredor = formattedTime;

  try {
    const lead = await Lead.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return lead;
  } catch (error) {
    throw new Error(`Error updating lead with id ${id}: ${error.message}`);
  }
};

module.exports = updateLeadById;
