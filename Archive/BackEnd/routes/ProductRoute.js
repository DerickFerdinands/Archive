const express = require('express');
const router = express.Router();
const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')
const {testImageUpload, saveProduct, findAllProducts, findProduct,removeProduct,updateProduct,filterProducts,updateProductsWithoutImages} = require('../controller/ProductController');
const path = require('path');

// Define the maximum size for uploading
// picture i.e. 20 MB. it is optional
const maxSize = 20 * 1000 * 1000;

var upload = multer({
    storage: multerGoogleStorage.storageEngine(),
    limits: {fileSize: maxSize},
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|webp/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }
});


// router.post('/',upload.array("mypic"), testImageUpload)
router.get('/', findAllProducts);
router.get('/:code', findProduct);
router.delete('/:code', removeProduct);
router.post('/', upload.array("productImages", 5), saveProduct)
router.post('/filter', filterProducts)
router.put('/', upload.array("productImages", 5), updateProduct)
router.put('/withoutImages', updateProductsWithoutImages)

module.exports = router;