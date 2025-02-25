var express = require('express');
var router = express.Router();

router.use('/user', require('../controller/auth.controller').router);
router.use('/day', require('../controller/day.controller').router);
router.use('/section', require('../controller/content.controller').router);
router.use('/mapping', require('../controller/mapping.controller').router);
router.use('/common',require('../controller/common.controller').router);
router.use('/razorpay', require('../controller/razorpay.controller').router);
router.use('/gemini', require('../controller/gemini.controller').router);
router.use('/gpt', require('../controller/gpt.controller').router);

module.exports = router;
