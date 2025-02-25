const Day = require('../models').day;
const Section = require('../models').section;

const getAllDayDetails = async function (req) {
  const [dayErr, dayDetails] = await to(Day.findAll({
    where: {
      isDeleted: false
    },
    include: [
      {
        model: Section,
        where: { isDeleted: false },
        attributes: ['id', 'name', 'dayId', 'isDeleted', 'index'],
        required: true
      }
    ],
    order: [
      ['id', 'ASC'],
      [Section, 'index', 'ASC']
    ]
  }));
  if (dayErr) return TE(dayErr.message);
  if (dayDetails) return dayDetails;
}
module.exports.getAllDayDetails = getAllDayDetails;


const getAllDays = async function (req) {
  const [dayErr, dayDetails] = await to(Day.findAll({
    where: {
      isDeleted: false
    }
  }));
  if (dayErr) return TE(dayErr.message);
  if (dayDetails) return dayDetails;
}

module.exports.getAllDays = getAllDays;



