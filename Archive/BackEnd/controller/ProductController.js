const {Storage} = require('@google-cloud/storage');
const Product = require('../model/Product')

// Creates a client
const storage = new Storage();

const testImageUpload = async (req, res) => {

    console.log(req.files)

    res.send('ok');
}

const saveProduct = async (req, res) => {

    const tempProduct = new Product(
        {
            code: req.body.code,
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: +req.body.price,
            options: req.body.options.map((opt) => JSON.parse(opt)),
            imageUrls: req.files.map((file) => file.linkUrl)
        }
    );

    await tempProduct.save()
        .then((success) => {
            console.log(success)
            res.status(201).json({message: "Product Saved", image: success.imageUrls})
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })

}

const findAllProducts = async (req, res) => {

    await Product.find()
        .then((products) => {
            console.log(products)
            res.json({products: products});
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })

}

const findProduct = async (req, res) => {


    await Product.findOne({code: req.params.code})
        .then((success) => {
            res.json({message: "Product Found", data: success});
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
}

async function deleteFile(fileName) {

    const deleteOptions = {
        ifGenerationMatch: 0,
    };

    await storage.bucket(process.env.GCS_BUCKET).file(fileName).delete(deleteOptions);

}

const removeProduct = async (req, res) => {


    await Product.findOne({code: req.params.code})
        .then(async (success) => {
            const fileNames = success.imageUrls.map((url) => url.split('https://storage.googleapis.com/archive_product_image_bucket/')[1])
            console.log(fileNames)

            for (const fileName of fileNames) {
                await deleteFile(fileName)
                    .then(() => {
                        console.log('ok')
                    })
                    .catch((err) => {
                        console.log("error",err)
                        res.status(500).json({message: err})
                    });
            }

            await Product.findOneAndDelete({code: req.params.code})
                .then((success) => {
                    res.json({message: "Product Removed", data: success});
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })

            res.json({message: "Product Removed", data: fileNames});
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })


}

module.exports = {
    testImageUpload,
    saveProduct,
    findAllProducts,
    findProduct,
    removeProduct
}