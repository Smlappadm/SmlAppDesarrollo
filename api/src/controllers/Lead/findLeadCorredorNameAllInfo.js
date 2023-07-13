const Lead = require("../../models/Lead");

const findLeadCorredorNameAllInfo = async (
  corredor,
  vendedor,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status,
  descargados
) => {
  const query = {
    corredor_name: corredor,
    vendedor_name: vendedor,
    checked: true,
    view: true,
    freelancer: false,
  };

  if (fromDay && toDay) {
    const [fromYear, fromMonth, fromDayOfMonth] = fromDay.split("-");
    const [toYear, toMonth, toDayOfMonth] = toDay.split("-");

    const startDate = new Date(
      parseInt(fromYear),
      parseInt(fromMonth) - 1,
      parseInt(fromDayOfMonth),
      0,
      0,
      0
    );
    const endDate = new Date(
      parseInt(toYear),
      parseInt(toMonth) - 1,
      parseInt(toDayOfMonth),
      23,
      59,
      59
    );
    query.updateCorredor = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (profesion) {
    query.profesion = profesion;
  }

  if (country) {
    query.country = country;
  }

  if (category) {
    query.category = category;
  }

  if (level) {
    query.level = level;
  }

  if (status) {
    query.status = status;
  }

  if (descargados === "false") {
    query.descargadosLeader = descargados;
  }



  const leads = await Lead.find(query).exec();
  return leads;
};

module.exports = findLeadCorredorNameAllInfo;
