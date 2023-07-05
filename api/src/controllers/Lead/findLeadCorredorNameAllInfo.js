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
  status
) => {
  const regexCorredor = corredor ? new RegExp(corredor, "i") : /.*/;
  const regexVendedor = vendedor ? new RegExp(vendedor, "i") : /.*/;
  const query = {
    corredor_name: regexCorredor,
    vendedor_name: regexVendedor,
    checked: true,
    view: true,
    freelancer: { $ne: true },
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
    query.updatedAt = {
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

  const leads = await Lead.find(query).exec();
  return leads;
};

module.exports = findLeadCorredorNameAllInfo;



