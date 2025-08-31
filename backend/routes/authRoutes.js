const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//Signup
router.post("/signup", async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username , email, password:hashedPassword});
        await user.save();
        res.json({message: "User created successfully"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {res.status(500).json({ error: err.message });}
});


module.exports = router;