const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");
const multer = require("multer");
const { storage } = require("../lib/cloudinaryConfig");
const router = express.Router();

const upload = multer({ storage: storage });

router.get("/blogs", getAllBlogs); 
router.post("/blog/create", upload.single("file"), createBlog); 
router.post("/blog/update/:id", upload.single("file"), updateBlog); 
router.delete("/blog/delete/:id", deleteBlog); 

module.exports = router;
