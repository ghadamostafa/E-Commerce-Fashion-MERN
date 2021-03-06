const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User =require('../models/user')
async function auth(request, response, next) {
  const token = request.cookies["token"];
  try {
    if (!token) {
      response.status(401)
      throw new Error('Please Login and try again')
    }
    const userId= await jwt.verify(
      token,
      process.env.ACCSESS_TOKEN_SECRET
    );
    console.log(userId);
    const user= await User.findOne({_id:userId.user});
    request.user = user;
    // if(!decryptedUser.enabled ) throw new Error('you are blocked')
    next();
  } catch (error) {
     response.status(500);
    next(error)
  }
}
const isAdmin = (request, response, next) => {
  console.log(request.user);
  if (request.user && request.user.role == "admin") {
    next();
  } else {
    response.status(401);
    throw new Error("not authorized  as admin");
  }
};

module.exports= { auth, isAdmin };
