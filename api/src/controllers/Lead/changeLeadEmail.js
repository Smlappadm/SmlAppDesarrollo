const Lead = require("../../models/Lead");



const changeLeadEmail = async (id , emailUpdate) => {

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { email: emailUpdate },
        { new: true }
      );
    return lead;
    // "wght@300..900"
};

module.exports = changeLeadEmail;
