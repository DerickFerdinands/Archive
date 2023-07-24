require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const userRoute = require('./routes/UserRoute');
const productRoute = require('./routes/ProductRoute');
const purchaseRouter = require('./routes/PurchaseRoute');
const path = require("path");
const src = path.join(__dirname, "public");
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/archive")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`)
        })
    })
    .catch((err) => {
        console.error(err);
    })

app.get('/', (req, res) => {
    res.sendFile(src + "/index.html");
})


app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/purchase", purchaseRouter);

