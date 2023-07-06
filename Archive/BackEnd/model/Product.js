const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode:{

    },
    productName:{
        type:String,
        required:true
    }
})
