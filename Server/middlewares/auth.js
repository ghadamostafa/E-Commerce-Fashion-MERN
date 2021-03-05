const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');

async function verifyAccessToken(request,response,next){
    const token = request.cookies['token'];
    try {
        if (!token) {
            // redirect to login
          return response.status(401).json('Please Login and try again')
        }
        const decryptedUser = await jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET);
        request.user = decryptedUser;
        next();
      } catch (error) {
        return response.status(500).json(error.toString());
      }

}
module.exports=verifyAccessToken