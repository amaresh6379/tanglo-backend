const router = require('express').Router();
const DaysService = require('../service/day.service');
const MSG = require('../msg').MSG;
/**
 * Function used to get all day details.
 */
const getAllDayDetails = async function (req, res) {
  const [err, data] = await to(DaysService.getAllDayDetails(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}


/**
 * Function used to get all days.
 */
const getAllDays = async function (req, res) {
  const [err, data] = await to(DaysService.getAllDays(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}


router.get('/section', getAllDayDetails);
router.get('/', getAllDays)
module.exports = { router, getAllDayDetails };