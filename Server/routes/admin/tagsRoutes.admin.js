const express = require("express");
const router = express.Router();
const Tag = require("../../models/tag");

//show tag
router.get("/:slug", async (request, response, next) => {
  try {
    const tag = await Tag.findOne({ slug: request.params.slug });
    if (!tag) {
      response.status(404);
      throw new Error("tag not found");
    } else {
      response.status(200).json({success:true,data: tag });
      next();
    }
  } catch (error) {
    next(error);
  }
  return;
});

// delete tag ... /admin/tags/:slug
router.delete("/:slug", async (request, response, next) => {
  try {
    const tag = await Tag.findOneAndDelete(
      { slug: request.params.slug },
      {
        returnOriginal: false,
      }
    );
    if (!tag) {
      response.status(404);
      throw new Error("tag not found");
    } else {
      response.json({ success:true });
      next();
    }
  } catch (error) {
    next(error);
  }
});

//store tag ... /admin/tags
router.post("/", async (request, response, next) => {
  try {
    console.log('hi');
    const tag = new Tag(request.body);
    await tag.save();
    response.status(201).json({success:true, data:tag });
    next();
  } catch (error) {
    next(error);
  }
});

//update tag ... /admin/tags/:slug
router.put("/:slug", async (request, response, next) => {
  try {
    const tag = await Tag.findOneAndUpdate(
      { slug: request.params.slug },
      request.body,
      {
        returnOriginal: false,
      }
    );
    if (!tag) {
      response.status(404);
      throw new Error("tag not found");
    } else {
      response.status(200).json({ success:true,data:tag });
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
