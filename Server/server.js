const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes= require('./routes');
const cors=require('cors');
require('dotenv').config({ path: "./.env" });


const server = express();
const port = process.env.PORT;

//database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{console.log("connect to database")})
.catch((error)=>{console.log(error+"")});
mongoose.set('useFindAndModify', false);

//start server
server.listen(port, () => {
    console.log('server is running on port '+port);
});


//body parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//cookie parser middleware
server.use(cookieParser());
server.use(cors({origin: true, credentials: 'include'}));

//app routes
server.use(routes.auth);
server.use('/',routes.home);
server.use('/products',routes.products);
server.use('/tags',routes.tags);
server.use('/categories',routes.categories);
server.use('/filters',routes.filters);

//admin routes
server.use('/admin/products',routes.adminProducts);
server.use('/admin/categories',routes.adminCategories);
server.use('/admin/tags',routes.adminTags);
server.use('/admin/users',routes.users);

//error handling middleware
server.use((error, request, response, next) => {   
    const statusCode=response.statusCode ==200? 500: response.statusCode;
    console.log(error);
    response.status(statusCode).json({
        message:error.message,
        stack:process.env.NODE_ENV =='production'?null:error.stack
    })
     })


