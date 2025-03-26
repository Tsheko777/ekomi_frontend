import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  const login = async () => {
    const backend = process.env.REACT_APP_BACKEND;
    try {
      setLoading(true);
      await axios.get(backend + "/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await axios.post(backend + "/api/login", { email: email, password: password }, { withCredentials: true, withXSRFToken: true });
      /*  const response = await axios.post(backend + "/api/login", { email: email, password: password }); */

      if (response && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
        //navigate("/dashboard");
      }
      setError((prev) => response.message);
    } catch (error) {
      if (error && error.response) {
        setError((prev) => error.response.data.message);
        return;
      }
      setError((prev) => "Error login: Please contact webmaster");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spinner className="mx-auto my-4 text-center" animation="border" variant="primary" />;
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: "25rem", borderRadius: "1rem" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-dark">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-dark">
                Email
              </label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">
                Password
              </label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Log In
              </button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-dark">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary">
                  Sign Up
                </a>
              </p>
            </div>
            <p className="text-danger">{error && error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
