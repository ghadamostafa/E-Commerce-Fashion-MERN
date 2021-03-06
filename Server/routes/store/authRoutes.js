require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const {auth} = require('../../middlewares/auth');
const jwt=require('jsonwebtoken');


router.post('/register', async (request, response, next) => {
    const newUser = new User(request.body)
    try {
        await newUser.save()
        //generate access token
        await newUser.generateAccessToken(response);
        return response.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error)
        // response.status(400);
    }
});

router.post('/login', async (request, response, next) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password, response)
        if(!user.enabled)  throw new Error("you are blocked");
        await user.generateAccessToken(response);
        return response.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(response.statusCode);
        next(error);
    }
});

router.get('/login/status',async (request, response, next) => {
    const token = request.cookies['token'];
    try {
        if (!token) {
            return response.send(false);
        }
        const user = await jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET);
        request.user = user;
        return response.send(true);
    } catch (error) {
        // return response.status(500).json(error.toString());
        next(error)
    }
})

router.post('/logout', auth, (request, response, next) => {
    response.clearCookie('token');
    return response.json({ "message": "logout successed" });
})

module.exports = router;