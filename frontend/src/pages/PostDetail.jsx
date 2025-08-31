import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/axiosInstance";
import "../App.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!post) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p><strong>By:</strong> {post.author.username}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
