const router = require('express').Router();
const MappingService = require('../service/mapping.service');
const MSG = require('../msg').MSG;
const passport = require('passport');
/**
 * Function used to create user day mapping.
 */
const createUserDayMapping = async function(req,res){
    const [err,data]  = await to(MappingService.createUserDayMapping(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
/**
 * Function used to create user mapping section.
 */
const createUserSectionMapping = async function(req,res){
    const [err,data]  = await to(MappingService.createUserSectionMapping(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
/**
 * Function used to get completed section and day details.
 */
const getCompletedSectionDetails = async function(req,res){
    const [err,data]  = await to(MappingService.getCompletedSectionDetails(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}


/**
 * Function used to get completed day details.
 */
const getCompletedDays = async function(req,res){
    const [err,data]  = await to(MappingService.getCompletedDays(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
router.post('/day/:dayId', passport.authenticate('jwt', { session: false }),createUserDayMapping);
router.post('/section/:sectionId',passport.authenticate('jwt', { session: false }),createUserSectionMapping);
router.get('/section', passport.authenticate('jwt', {session :  false}), getCompletedSectionDetails);
router.get('/day', passport.authenticate('jwt', {session :  false}), getCompletedDays);
module.exports = {router,createUserDayMapping,createUserSectionMapping};