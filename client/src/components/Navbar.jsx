import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const styles = {
    navbar: {
      backgroundColor: "#5a3e36",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 30px",
      borderBottom: "4px solid #000",
      color: "#fff",
    },
    linkGroup: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
    },
    button: {
      backgroundColor: "#fff",
      color: "#5a3e36",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.linkGroup}>
        <Link to="/events" style={styles.link}>Home</Link>
        <Link to="/my-registrations" style={styles.link}>My Events</Link>
        <Link to="/create-event" style={styles.link}>Create</Link>
      </div>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Navbar;
