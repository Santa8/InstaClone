const express = require('express')

const app = express()
const https = require('httpolyglot')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connnection to Database
mongoose.connect(process.env.DB_URL,
    { useUnifiedTopology: true },
    () => console.log('Connected to DB!')
    );
    
//Middleware
app.use(express.json());
    