const {Storage} = require('@google-cloud/storage');
const {Product} = require('../model/Product')


const testImageUpload = async (req, res) => {

    console.log(req.files)

    res.send('ok');
}

const saveProduct = (req, res) => {
    // const product = new Product();
    console.log(req.body)
    const parsed = req.body.options.map((opt)=>JSON.parse(opt))
    console.log(parsed)
    res.send('ok');
}

module.exports = {
    testImageUpload,
    saveProduct
}