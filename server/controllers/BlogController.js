const BlogSchema = require("../models/Blog/BlogSchema");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ data: blogs });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!title || !content || !imageUrl) {
      return res.status(400).json({ message: "Title, content, and image are required" });
    }

    const newBlog = new BlogSchema({
      title,
      content,
      imageUrl,
    });

    await newBlog.save();
    return res.status(201).json({ message: "Blog created successfully", data: newBlog });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    let updatedData = { ...req.body };
    if (req.file) {
      updatedData.imageUrl = req.file.path;
    }

    const updatedBlog = await BlogSchema.findByIdAndUpdate(blogId, updatedData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await BlogSchema.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};