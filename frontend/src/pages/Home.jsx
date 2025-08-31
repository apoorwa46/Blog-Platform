import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axiosInstance";
import "../App.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>All Posts for you......</h2>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <h3>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </h3>
          <p>by {post.author.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;