const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_gDGlUytq9DTvnH', key_secret: 'n004um6NZ9VpdfiCp47GLUpV' });
const PaymentLogs =  require('../models').paymentLogs;

const createRazorPayOrders =  async function (req) {
    let body = req && req.body;
    var options = {
        amount: String(body.amount) + '00',
        currency: "INR",
        receipt: "order_rcptid_11"
      };
    const  [razorpayErr,razorpayOrderdata] =  await to(instance.orders.create(options));
    if(razorpayErr) return TE(razorpayErr.message);
    if(razorpayOrderdata){
        return razorpayOrderdata;
    } 
}
module.exports.createRazorPayOrders = createRazorPayOrders;

const createPaymentLogs =  async function (req) {
    let [paymentErr,paymentSucess] = await to(PaymentLogs.create({
        amount: '50',
        isDeleted: false
    }));
    if(paymentErr){
        return TE(paymentErr.message);
    }
    if(paymentSucess) return paymentSucess;
}
module.exports.createPaymentLogs = createPaymentLogs;