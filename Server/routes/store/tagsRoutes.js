const express = require("express");
const router = express.Router();
const Tag = require("../../models/tag");

//get all tags
router.get("/",async (request, response, next) => {
    try {
        const tags=await Tag.find({})
        if (tags.length === 0) {
            response.status(404)
            throw new Error('NO tags yet!')
          } else {
            response.status(200).json({ success:true,data:tags });
            next()
          }
    } catch (error) {
        next(error)
    }
  
});


module.exports = router;
