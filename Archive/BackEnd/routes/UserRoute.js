const express = require('express');
const router = express.Router();
const {saveUser,loginUser,findUser,deleteUser,updateUser,saveUserWithGoogle,loginUserWithGoogle} = require('../controller/UserController');

router.route('/')
    .post(saveUser)
    .put(updateUser)

router.route('/:email')
    .get(findUser)
    .delete(deleteUser)

router.post('/login',loginUser)
router.post('/login/gis',loginUserWithGoogle)
router.post('/gis',saveUserWithGoogle)

module.exports = router;
