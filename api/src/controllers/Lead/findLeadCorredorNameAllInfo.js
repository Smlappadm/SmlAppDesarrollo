const Lead = require("../../models/Lead");

const findLeadCorredorNameAllInfo = async (name, fromDay, toDay) => {
  const regex = name ? new RegExp(name, "i") : /.*/;
  const query = {
    corredor_name: regex,
    checked: true,
    view: true,
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

  const leads = await Lead.find(query).exec();
  return leads;
};

module.exports = findLeadCorredorNameAllInfo;

