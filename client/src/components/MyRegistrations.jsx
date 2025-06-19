import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("registrations/");
      setRegistrations(res.data);
    } catch (err) {
      console.error("Error fetching registrations.");
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  return (
    <div className="container">
      <h2>My Registered Events</h2>
      {registrations.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        registrations.map((reg) => (
          <div key={reg.id} style={{ borderBottom: "1px solid #000", marginBottom: "20px", paddingBottom: "10px" }}>
            <h3>{reg.event.title}</h3>
            <p><b>Date:</b> {reg.event.date}</p>
            <p>{reg.event.description}</p>
            <p><i>Registered on:</i> {new Date(reg.registered_on).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRegistrations;
