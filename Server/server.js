const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes= require('./routes');
const cors=require('cors');
require('dotenv').config()


const server = express();
const port = process.env.PORT;

//database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{console.log("connect to database")})
.catch((error)=>{console.log(error+"")});


//start server
server.listen(port, () => {
    console.log('server is running');
});


//body parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//cookie parser middleware
server.use(cookieParser());
server.use(cors({origin: true, credentials: 'include'}));

//app routes
server.use(routes.auth);
// server.use('/products',routes.products);
// server.use('/users',routes.users);

