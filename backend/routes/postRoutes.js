const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

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
router.put("/:id", authMiddleware, async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
})

// Delete post
router.delete("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });

  await post.remove();
  res.json({ message: "Post deleted" });
});

module.exports = router;