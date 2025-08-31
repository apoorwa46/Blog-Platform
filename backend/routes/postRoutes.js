const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// new post
router.post("/", authMiddleware, async (req,res)=>{
    try{
        const {title, content}= req.body;
        const newPost = new Post({ title, content, author: req.userId });
        await newPost.save();

        res.status(201).json(newPost);
    }catch(err){res.status(500).json({ error: err.message });}
});

//get all post
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});

// get single post
router.get("/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id).populate("author", "username");
  res.json(posts);
});

// Update post
router.put("/:id",  async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
})

// Delete post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete safely
    await post.deleteOne(); // ✅ safe in Mongoose 6/7

    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);  // 👈 this will show in Render logs
    return res.status(500).json({ error: err.message || "Server error while deleting post" });
  }
});

module.exports = router;