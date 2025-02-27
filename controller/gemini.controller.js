const router = require('express').Router();
const GeminiService = require('../service/gemini.service');
const MSG = require('../msg').MSG;
/**
 * Function used to make converstion with gemini.
 */
const conversationWithGemini = async function(req,res){
    const [err,data]  = await to(GeminiService.conversationWithGemini(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
router.get('/',conversationWithGemini);
module.exports = {router,conversationWithGemini};