const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const Purchase = require('../model/Purchase')
const Product = require('../model/Product')

const getPurchaseID = async () => {
    return await Purchase.find()
        .sort({purchaseId: -1})
        .select({purchaseId: 1, _id: 0})
        .limit(1).then((purchaseId) => {
            var str = "" + (+purchaseId[0].purchaseId.split('-')[1] + 1);
            var pad = "000"
            var id = purchaseId.length>0? "PU-" + pad.substring(0, pad.length - str.length) + str:"PU-001";
            return id;
        }).catch((err) => 'PU-0001')

}

const proceedToCheckout = async (req, res) => {

    const dbSession = await mongoose.startSession();

    try {
        dbSession.startTransaction();

        const purchase = new Purchase({
            purchaseId: await getPurchaseID(),
            customerEmail: req.body.customerEmail,
            products: req.body.products,
            totalPrice: 0,
            paymentStatus: 'pending',
            status: 'pending'
        })

        const products = []
        const productsItr = [];

        for (let product of purchase.products) {
            let updateProduct = await Product.findOne({code: product.productCode})
            const option = updateProduct.options.filter(opt => opt.optionName === product.productOption)[0]


            if (option === null) throw new Error(`Option ${product.productOption} Not Found in Product:${updateProduct.code}`)
            if (option.optionQty < product.productQty) throw new Error(`Unavailable Qty:${product.productQty} Product:${updateProduct.code}`)

            option.optionQty -= product.productQty;
            product.price = updateProduct.price;
            purchase.totalPrice += updateProduct.price;

            await Product.updateOne({code: updateProduct.code}, {$set: {...updateProduct}}).then((updatedProduct) => {
                console.log('Updated Product')
            })


            products.push({
                name: updateProduct.name,
                imageUrls: updateProduct.imageUrls,
                price: updateProduct.price,
                requestedQty: product.productQty
            });
            console.log(products)

            productsItr.push(product);

        }


        console.log("ITR", productsItr)
        purchase.products = productsItr;

        await Promise.allSettled(productsItr).then(async () => {
            await purchase.save()
            console.log('products', products.map((product => product)))

            const session = await stripe.checkout.sessions.create({
                customer_email: 'customer@example.com',
                line_items: [
                    ...products.map(product => {
                            let data = {
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: product.name,
                                        images: [product.imageUrls[1]], // URL to the item image
                                    },
                                    unit_amount: product.price, // The price in cents or the smallest currency unit
                                },
                                quantity: product.requestedQty
                            }
                            console.log(data)
                            return data;
                        }
                    )

                ],
                mode: 'payment',
                success_url: "http://localhost:3000/redirect/success",
                cancel_url: `http://localhost:3000/redirect/failed`,
            })

            res.json({status: 303, url: session.url});
            console.log('Commited')
            await dbSession.commitTransaction();

        })


    } catch (err) {

        await dbSession.abortTransaction();
        console.log('Transaction Aborted', err)
        res.status(500).json({error: err});
    } finally {
        await dbSession.endSession();
    }
}

const processTransaction = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // const items = await stripe.line_items.retrieve(+"")
    console.log(session.line_items)
    res.send()
}

module.exports = {
    proceedToCheckout,
    processTransaction
}