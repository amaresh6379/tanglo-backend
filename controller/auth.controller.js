const router = require('express').Router();
const authService = require('../service/auth.service');
const MSG = require('../msg').MSG;
const passport = require('passport');


const userCreate = async function(req,res){
    // const idToken  = req && req.query && req.query.idToken;
    const [err,data]  = await to(authService.userVerify(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { userToken: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}


const getUser = async function(req,res){
    const [err,data]  = await to(authService.getUser(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { user: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
}

const updateUser =  async function(req,res){
    const [err,data]  = await to(authService.updateUser(req));
    if (err) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: err.message }), 422);
    }
    return ReS(res, { user: data, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200);
    
}



router.get('/signin', userCreate);
router.get('/',passport.authenticate('jwt', { session: false }),getUser);
router.put('/',passport.authenticate('jwt', { session: false }),updateUser)
module.exports = {router,userCreate};