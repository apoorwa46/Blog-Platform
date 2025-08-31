import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/axiosInstance";
import "../App.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);

    // fetch post
    API.get(`/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/post/${id}`);
      alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Error deleting post");
    }
  };

  if (!post) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p><strong>By:</strong> {post.author.username}</p>
      <p>
        <strong>Created:</strong>{" "}
        {new Date(post.createdAt).toLocaleString()} 
      </p>
      <p>{post.content}</p>

      {loggedIn && (
        <div style={{ marginTop: "20px" }}>
          <Link to={`/post/${post._id}/edit`} className="btn">Edit</Link>
          <button onClick={handleDelete} className="btn danger" style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
