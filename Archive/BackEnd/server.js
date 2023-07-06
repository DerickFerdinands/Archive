require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT =process.env.PORT;
const userRoute = require('./routes/UserRoute');
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/archive")
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is Running on PORT ${PORT}`)
        })
    })
    .catch((err)=>{
    console.error(err);
    })

app.use("/api/v1/user",userRoute);

