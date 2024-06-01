const express = require('express');
const app = new express();
const router = require('./src/routes/api.js');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');
const {error}=require('console');

app.use(cors());
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//Json Limit
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:"false"}));

//repeated request Limit 
const limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

//Database Connection   
mongoose.connect('mongodb+srv://ahmadorpu:ahmadorpu1234@cluster0.jqsrpzu.mongodb.net/EcommerceBackend',{autoIndex:true}).then((res)=>{
    console.log("Connected To MongoDB")
}).catch((error)=>{
    console.log("Failed To Connect MongoDB")
})

// For Not Cashing
app.set("etag",false);

//connection with router
app.use('/api/v1',router)










module.exports=app;