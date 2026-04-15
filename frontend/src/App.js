import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import Admin from "./Admin";
import Login from "./Login";

// 👉 Contact Form Component
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leads", {
  ...form,
  source: "website"
});
      alert("Message Sent ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Error ❌");
    }
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <div className="navbar">
        <h2>My CRM</h2>
        <button onClick={() => navigate("/login")}>
          Admin Login 🔐
        </button>
      </div>

      {/* 🔹 Form */}
      <div className="container">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}

// 👉 Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;