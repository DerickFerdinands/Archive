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
   /* jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        console.log(err)
        req.user = user
        next()
    })*/

}

module.exports = router;

/*
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRmlyc3ROYW1lIjoiRGVyaWNrIEFuZHJldyIsInVzZXJMYXN0TmFtZSI6IkZlcmRpbmFuZHMgNTkiLCJ1c2VyRW1haWwiOiJkZXJpY2thbmRyZXdmZXJkaW5hbmRzQGdtYWlsLmNvbSIsInVzZXJDb250YWN0TnVtYmVyIjoiIiwiYXV0aGVudGljYXRlZFdpdGhHb29nbGUiOnRydWUsInVzZXJJbWFnZVVybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGZSTVhzMy1YV1JXczZ0cDUxWnFDWXlXZm14aVh1YTFlQi1oWXk4aHpCbHkyZz1zOTYtYyIsInVzZXJSb2xlIjoidXNlciIsIl9pZCI6IjY0YmVhNmIyM2MwZmI4Y2NmZjdiYjdiOCIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjRUMTY6Mjg6MzQuOTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjRUMTY6Mjg6MzQuOTQ5WiIsImlhdCI6MTY5MDIxNjExNCwiZXhwIjoxNjkwODIwOTE0fQ.Gg86n_UvVbpOMJmT2rR1ZpDqRMdOLesZiy8uxzO2oPw','cda66327fc75f6a67e4b52c901ddbce41dad6c3491b6e077a23ad1b223f7d859cdcc7da024e853e5d63566ae1a6d11bbfc30493255b1d8fd13034d766456faab', (err,user)=>{
    if(err) return console.log('403',err)
    else console.log('success',user)
})*/
