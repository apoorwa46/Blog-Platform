import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import "../App.css";

function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // or sessionStorage depending on where you store it

      await API.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      alert("Error creating post. Are you logged in?");
    }
  };

  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Write your post..."
          rows="6"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;