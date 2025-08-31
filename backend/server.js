const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app=express();

//Middleware
app.use(express.json());

// app.use(cors({
//     origin: ["http://localhost:5173" ,"https://blog-platform-gamma-seven.vercel.app"],
//     credentials: true
// }));

app.use(cors({
  origin: "*"
}));



const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})