const mongoose = require('mongoose');
const ProductOption =  require('../model/ProductOptions');

const ProductSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    options:{
        type:[ProductOption],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrls:{
        type:[String],
        required:true
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required:true,
        default: Date.now
    }
})

module.exports = mongoose.model('Product',ProductSchema);
