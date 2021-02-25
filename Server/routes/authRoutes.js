require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');


router.get('/profile', auth, (request, response, next) => {
    response.status(200).json({
        status: 'authentication'
    });
    next();
});

router.get('/register', (request, response, next) => {
    response.status(200).json({
        status: 'authentication'
    });
    next();
});

router.post('/register', async (request, response, next) => {
    const newUser = new User(request.body)
    try {
        await newUser.save()
        //generate access token
        const token = await newUser.generateAccessToken();
        //save token in cookies
        response.cookie('token', token, {
            expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRATION_DATE),
            secure: false,
            httpOnly: true,
        });
        response.status(201).json({ user: newUser });
    } catch (error) {
        response.status(400).json(error)
    }

    // User.addUser(request.body)
    // .then(res => {return response.json({success:true,message:"user registered successfully"})})
    //     .catch(error => {throw error;return response.json({success:false,message:"failed"})} )  

    next();

});

router.get('/login', (request, response, next) => {
    response.status(200).json({
        status: 'authentication'
    });
    next();

});

router.post('/login', async (request, response, next) => {
    await User.findByCredentials(request.body.email, request.body.password)
        .then((result) => {
            result.generateAccessToken().then((token) => {
                response.cookie('token', token, {
                    expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRATION_DATE),
                    secure: false,
                    httpOnly: true,
                });
                response.status(200).json({ user: result });
            })
        })
        .catch((error) => {
            console.log(error);
            const errorMessage = error.message;
            response.status(400).json({ error: errorMessage })
        })
    next();

});


module.exports = router;