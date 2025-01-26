import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // Initialize navigation function

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove auth token from localStorage
    navigate("/"); // Redirect to the home page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Brand/Logo */}
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            Foodie
          </Link>

          {/* Navbar Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Conditional Authentication Buttons */}
            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                {/* Authenticated: Show Logout Button */}
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                {/* Not Authenticated: Show Login and Signup */}
                <Link className="btn btn-outline-primary ms-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success ms-2" to="/createuser">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
