const express = require('express');
const router = express.Router();

const {testImageUpload} = require('../controller/ProductController');

router.route('/')
    .post(testImageUpload)

module.exports = router;