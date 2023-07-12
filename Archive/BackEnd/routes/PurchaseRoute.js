const express = require('express');
const router = express.Router();
const {proceedToCheckout,processTransaction} = require('../controller/PurchaseController')

router.post('/',proceedToCheckout);
router.get('/paymentSuccess',processTransaction);

module.exports = router;