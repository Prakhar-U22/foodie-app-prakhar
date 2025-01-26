import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://foodie-backend-zp89.onrender.com/api/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        // on click login button, it navigates back to the home page
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card shadow-lg p-4" style={{ width: '400px' }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name='email'
                value={credentials.email}
                onChange={onChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name='password'
                value={credentials.password}
                onChange={onChange}
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/createUser" className="btn btn-link">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
