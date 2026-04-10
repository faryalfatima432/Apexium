import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch(`${backend_url}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {

        setSuccess("Message sent successfully!");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

      }

    } catch (err) {
      alert("Failed to send message");
    }

    setLoading(false);
  };

  return (

    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you</p>
      </div>


      {/* CONTACT INFO */}
      <div className="contact-info">

        {/* EMAIL */}
        <div className="info-card">
          <FaEnvelope className="icon"/>
          <h3>Email</h3>

          <a href="mailto:apexium@site.com">
           apexium@site.com
          </a>

        </div>


        {/* PHONE */}
        <div className="info-card">
          <FaPhone className="icon"/>
          <h3>Phone</h3>

          <a href="tel:+923001234567">
            +92 300 1234567
          </a>

        </div>


        {/* LOCATION */}
        <div className="info-card">
          <FaMapMarkerAlt className="icon"/>
          <h3>Location</h3>

          <a
            href="https://www.google.com/maps?q=Karachi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Karachi, Pakistan
          </a>

        </div>

      </div>


      {/* CONTACT FORM */}
      <div className="contact-form-container">

        <form onSubmit={handleSubmit} className="contact-form">

          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && <p className="success-msg">{success}</p>}

        </form>

      </div>


      {/* MAP */}
      <div className="map-section">

        <h2>Our Location</h2>

        <iframe
          title="Karachi Location"
          src="https://maps.google.com/maps?q=Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
        />

      </div>

    </div>

  );

};

export default Contact;