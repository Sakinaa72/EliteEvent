import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("events/");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events.");
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const handleRegister = async (id) => {
    try {
      await api.post(`events/${id}/register/`);
      alert("Registered successfully.");
    } catch (err) {
      alert("Already registered or error occurred.");
    }
  };

  return (
    <div className="container">
      <h2>All Events</h2>
      <p>
        <a href="/my-registrations">View My Registrations</a>
      </p>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={{
              borderBottom: "1px solid #000",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
          >
            <h3>{event.title}</h3>
            <p>
              <b>Date:</b> {event.date}
            </p>
            <p>{event.description}</p>
            <button onClick={() => handleRegister(event.id)}>Register</button>
            <a href={`/events/${event.id}`}>View Details</a>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
