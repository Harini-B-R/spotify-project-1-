import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom px-3 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🎵 SongWave
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/library">Library</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 me-3">
            <SearchBar />
          </div>

          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-info small">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-sm btn-outline-light">Login</Link>
              <Link to="/signup" className="btn btn-sm btn-outline-light">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
