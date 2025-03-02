const router = require('express').Router();
const CommonService = require('../service/common.service');
const MSG = require('../msg').MSG;
const cron = require("node-cron");
const axios = require('axios');

/**
 * Function used to get particular section content.
 */
const getSectionHint = async function (req, res) {
  const [err, data] = await to(CommonService.getSectionHint(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}


/**
 * Function used to get particular section content.
 */
const getContentMistake = async function (req, res) {
  const [err, data] = await to(CommonService.getContentMistake(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}

/**
 * Function used to check the mistake and provide the score.
 */
const checkMistakes = async function (req, res) {
  const [err, data] = await to(CommonService.checkMistakes(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}

const healthCheck = async function (req, res) {
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}

const callHealthcheck = async function () {
  try {
    const data = await axios.get('https://tanglo-backend-1.onrender.com/v1/day');
    if (data) {
      console.log("Cron job is successfully exceuted.");
    }
  }
  catch (err) {
    console.log("Error", err);
  }
}

const job = cron.schedule("*/5 * * * *", callHealthcheck);

router.get('/hint', getSectionHint);
router.get('/mistake', getContentMistake);
router.post('/content/:contentId', checkMistakes);
router.get('health-check', healthCheck);

module.exports = { router, getSectionHint };