import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    API.get(`/post/${id}`)
      .then(res => setFormData({ title: res.data.title, content: res.data.content }))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/post/${id}`, formData);
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      alert("Error updating post");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          rows="6"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPost;
