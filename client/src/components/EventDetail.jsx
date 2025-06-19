import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`events/${id}/`);
      setEvent(res.data);
    } catch (err) {
      setError("Could not load event.");
    }
  };

  const handleRegister = async () => {
    try {
      await api.post(`events/${id}/register/`);
      alert("Registered successfully!");
    } catch (err) {
      alert("Already registered or registration failed.");
    }
  };

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!event ? (
        <p>Loading event...</p>
      ) : (
        <>
          <h2>{event.title}</h2>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Organizer:</b> {event.organizer}</p>
          <p>{event.description}</p>

          <button onClick={handleRegister}>Register</button>
          <br /><br />
          <a href={`/events/${event.id}/feedback`}>Give Feedback</a>
        </>
      )}
    </div>
  );
};

export default EventDetail;
