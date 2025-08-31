import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

return(
    <nav>
        <div>
            <Link to={'/'}>BlogForYou</Link>
        </div>
        <div>
        {token ? (
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
)
}
export default Navbar;