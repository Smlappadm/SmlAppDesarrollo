const Lead = require("../../models/Lead");



const changeLeadEmail = async (id , key, value) => {

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { [key]: value },
        { new: true }
      );
    return lead;
    // "wght@300..900"
};

module.exports = changeLeadEmail;
