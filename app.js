const express = require('express');
const cors = require('cors')
const routes = require('./routes/router')
const mongoose = require('mongoose')
const app = express();
const dotenv = require('dotenv');

dotenv.config()
app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'*'
}))

app.use(routes)
mongoose.connect(process.env.url,(err,res)=>{
    if(err)
    {console.log(err)
    return}
    console.log("connected to Db");
})

module.exports = app;
