const router = require('express').Router();
const ContentService = require('../service/content.service');
const MSG = require('../msg').MSG;
const passport = require('passport');
/**
 * Function used to get particular section content.
 */
const getParicularSectionContent = async function(req,res){
    const [err,data]  = await to(ContentService.getParicularSectionContent(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
router.get('/:id',getParicularSectionContent);

module.exports = {router,getParicularSectionContent};