const  {Storage} = require('@google-cloud/storage')
const Multer = require('multer');
const path = require('path');



const storage = new Storage(
    "archive-e-commerce",
    "archive-e-commerce-97d694326e0c.json"
);

const testImageUpload = (req,res)=>{
    console.log(path.join("../"+__dirname,"archive-e-commerce-97d694326e0c.json"))
    res.send("OK")
}
module.exports = {
    testImageUpload
}