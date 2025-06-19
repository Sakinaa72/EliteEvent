import React, { useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

const FeedbackForm = () => {
  const { eventId } = useParams();
  const [form, setForm] = useState({ comment: "", rating: 1 });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`events/${eventId}/feedback/`, form);
      setMsg("Feedback submitted.");
      setError("");
      setTimeout(() => navigate("/events"), 1500);
    } catch (err) {
      setError("You must be registered to give feedback.");
      setMsg("");
    }
  };

  return (
    <div className="container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          rows="4"
          placeholder="Write your feedback..."
          onChange={handleChange}
          required
        />
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} Star</option>
          ))}
        </select>
        <button type="submit">Submit</button>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FeedbackForm;
