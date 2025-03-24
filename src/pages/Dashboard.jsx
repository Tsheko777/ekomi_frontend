import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { redirect, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();

  const fetchContact = async () => {
    const token = localStorage.getItem("token");
    const backend = process.env.REACT_APP_BACKEND;
    const email = document.getElementById("email").value;
    if (email)
      try {
        setLoading(true);
        const response = await axios.get(backend + "/api/contact/" + email, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContact(response.data);
      } catch (error) {
        console.error("Error fetching contact:", error);
        if (error.response)
          if (error.response.status == 401) {
            navigate("/");
          }
      } finally {
        setLoading(false);
      }
  };
  if (loading) return <Spinner className="mx-auto my-4" animation="border" variant="primary" />;

  return (
    <div className="container">
      {contact && (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title">Contact Details for {email}</h5>
            <p className="card-text">
              <strong>Name:</strong> {contact.fullName}
            </p>
            <p className="card-text">
              <strong>Job Title:</strong> {contact.jobTitle}
            </p>
            <p className="card-text">
              <strong>Department:</strong> {contact.department}
            </p>
            <p className="card-text">
              <strong>Phone:</strong> {contact.phoneNumber}
            </p>
          </div>
        </div>
      )}
      {contact !== "" && contact.length == 0 && <h1 className="m-2 text-center">No data Found</h1>}
      {!loading && (
        <div className="mx-auto col-6">
          <div className="mb-3 mt-5">
            <label htmlFor="password" className="form-label text-dark">
              Email
            </label>
            <input type="email" className="form-control" id="email" required placeholder="Enter email" />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" onClick={() => fetchContact()} className="btn btn-primary btn-lg">
              Request Information
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
