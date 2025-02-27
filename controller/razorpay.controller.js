const router = require('express').Router();
const razorpayService  =  require('../service/razorpay.service');
const MSG = require('../msg').MSG;
const path  =  require('path');

const createRazorPayOrders =  async function(req,res){
    const [razorpayErr,razorpayData]  = await to(razorpayService.createRazorPayOrders(req));
    if (razorpayErr) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: razorpayErr.message }), 422);
    }
    return ReS(res, { userToken: razorpayData, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}

const paymentSuccessful =  async function(req,res){
    const [paymentErr,paymentSucess]  = await to(razorpayService.createPaymentLogs(req));
    if (paymentErr) {
        return ReE(res, Object.assign(MSG.CREATE_USER_FAILED,{ details: paymentErr.message }), 422);
    }
    return ReS(res, { userToken: paymentSucess, code: 200, message: MSG.CREATE_USER_SUCCESS.message }, 200); 
}
const razorpayDemo =  async function(req,res){
    res.sendFile(path.resolve(__dirname, '../html/index.html'));
}


router.post('/createOrder',createRazorPayOrders);
router.get('/payment-sucess',paymentSuccessful);
router.get('/demo', razorpayDemo)
module.exports = {router};