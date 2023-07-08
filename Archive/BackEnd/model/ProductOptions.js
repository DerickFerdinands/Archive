const mongoose = require('mongoose');

const ProductOptionSchema = new mongoose.Schema({
    optionName:{
            type:String,
            required:true
    },
    optionQty:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('ProductOption',ProductOptionSchema);