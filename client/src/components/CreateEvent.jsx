import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("events/", form);
      setMsg("Event created successfully.");
      setError("");
      setTimeout(() => navigate("/events"), 1500);
    } catch (err) {
      setError("Only admin can create events.");
      setMsg("");
    }
  };

  return (
    <div className="container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
