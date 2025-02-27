const router = require('express').Router();
const GptService = require('../service/gpt.service');
const MSG = require('../msg').MSG;
/**
 * Function used to make converstion with gemini.
 */
const conversationWithGemini = async function (req, res) {
  const [err, data] = await to(GptService.conversationWithGpt(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}
/**
 * Function used to make converstion with gemini.
 */
const converstionWithDeepSeek = async function (req, res) {
  console.log("entered  into converstionWithDeepSeek");

  const [err, data] = await to(GptService.converstionWithDeepSeek(req));
  if (err) {
    return ReE(res, Object.assign(MSG.CREATE_USER_FAILED, { details: err.message }), 422);
  }
  return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}
router.get('/deepseek', converstionWithDeepSeek);
router.get('/', conversationWithGemini);


module.exports = { router, conversationWithGemini, converstionWithDeepSeek };