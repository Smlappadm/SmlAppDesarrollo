const Corredor = require("../../models/Corredor");

function getValueLead() {
  Corredor.find(
    { "leads.checked": false },
    "leads",
    function (err, corredores) {
      if (err) {
        console.error(err);
        return;
      }

      corredores.forEach((corredor) => {
        const leadsNoChequeados = corredor.leads.filter(
          (lead) => !lead.checked
        );
      });
    }
  );
}
module.exports = getValueLead;
