const express = require('express');
const jwt = require("jsonwebtoken");
const {verifyRefreshToken} = require("../security/tokens");
const {verifyAccessToken} = require("../security/tokens");
const router = express.Router();
const {proceedToCheckout, processTransaction} = require('../controller/PurchaseController')

router.post('/', authenticateToken, proceedToCheckout);
router.get('/paymentSuccess', processTransaction);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) return res.sendStatus(401)

    let user = verifyRefreshToken(token)
    if (user !== null) req.user = user
    else return res.sendStatus(403)
    next()


}

module.exports = router;
