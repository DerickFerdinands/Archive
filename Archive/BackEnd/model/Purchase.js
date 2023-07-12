const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({

    purchaseId: {
        type: String,
        required: true,
        unique: true
    },
    customerEmail: {
        type: String,
        required: true,
    },
    products: {
        type: [{
            productCode: {
                type: String,
                required: true
            },
            productOption:{
                type: String,
                required: true
            },
            productQty:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            }

        }]
    },
    totalPrice:{
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },
    status:{
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('Purchase', PurchaseSchema)