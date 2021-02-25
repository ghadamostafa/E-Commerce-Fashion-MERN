const express = require('express');
const router = express.Router();

router.get('/',(requset,response,next)=>{
    response.status(200).json({
        status: 'users'
     });
     next();

});

module.exports = router;