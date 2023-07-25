const {Storage} = require('@google-cloud/storage');
const Product = require('../model/Product')

const projectId = process.env.GCLOUD_PROJECT;

// Creates a client
const storage = new Storage({
    projectId
});

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

const filterProducts = async (req,res)=>{

    await Product.find({category:{ $regex: '.*' + req.body.filterOption + '.*' }})
        .then((success) => {
            res.json({message: "Products Found", data: success});
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
}

async function deleteFile(fileName) {

    const deleteOptions = {
        ifGenerationNotMatch: 0,
    };

    return await storage.bucket(process.env.GCS_BUCKET).file(fileName).delete(deleteOptions);

}

const removeProduct = async (req, res) => {


    await Product.findOne({code: req.params.code})
        .then(async (success) => {
            const fileNames = success.imageUrls.map((url) => url.split('https://storage.googleapis.com/archive_product_image_bucket/')[1])
            console.log(fileNames)

            for (const fileName of fileNames) {
                await deleteFile(fileName)
                    .then((success) => {
                        console.log('ok', success)
                    })
            }

            await Product.findOneAndDelete({code: req.params.code})
                .then((success) => {
                    res.json({message: "Product Removed", data: success});
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })


        })
        .catch((err) => {
            console.log("ERROR", err)
            res.status(500).json({message: err})
        })


}

const updateProduct = async (req, res) => {

    let urls = req.files.map((file) => file.linkUrl);

    await Product.findOne({code: req.params.code})
        .then(async (success) => {

            for (const url of success.imageUrls) {
                if (!urls.some((linkUrl) => url === linkUrl)) {
                    await deleteFile(url.split('https://storage.googleapis.com/archive_product_image_bucket/')[1])
                        .then((success) => {
                            console.log('ok', success)
                        })
                }
            }


            await Product.updateOne({code: req.body.code}, {
                $set: {
                    name: req.body.name,
                    brand: req.body.brand,
                    category: req.body.category,
                    description: req.body.description,
                    price: +req.body.price,
                    options: req.body.options.map((opt) => JSON.parse(opt)),
                    imageUrls: req.files.map((file) => file.linkUrl)

                }
            })
                .then((success)=>{
                    res.json({message: "Product Updated", data: success})
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: err})
        })


}

module.exports = {
    testImageUpload,
    saveProduct,
    findAllProducts,
    findProduct,
    removeProduct,
    updateProduct,
    filterProducts
}