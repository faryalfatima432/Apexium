// Footer.js - Consistent padding across all screen sizes
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          <Col md={4} className="footer-brand">
            <h5 className="footer-title">Shopping by apexiums</h5>
            <p>Your one-stop destination for premium products at affordable prices.</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/apexium.space/" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://web.facebook.com/profile.php?id=61578011475053" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.tiktok.com/@apexium_technologies" aria-label="TikTok"><FaTiktok /></a>
            </div>
          </Col>
          
          <Col md={4} className="footer-links">
            <h6>Quick Links</h6>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          <Col md={4} className="contact-info">
            <h6>Contact Info</h6>
            <div className="info-line"><FaEnvelope className="info-icon" /><span>apexiumtechnologies@gmail.com</span></div>
            <div className="info-line"><FaPhone className="info-icon" /><span>+92 340 5542097</span></div>
            <div className="info-line"><FaMapMarkerAlt className="info-icon" /><span>Islamabad, Pakistan</span></div>
          </Col>
        </Row>
        
        <Row>
          <Col className="footer-bottom text-center">
            <p>&copy; {new Date().getFullYear()} Shopping by apexiums. All rights reserved.</p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        :root {
          --primary-color: #49aea2;
          --primary-dark: #3a8a80;
        }

        .footer {
          background-color: var(--primary-color);
          color: white;
          padding: 2.5rem 0 1rem;
          margin-top: 3rem;
        }

        .footer-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .footer-brand,
        .footer-links,
        .contact-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding-left: 1.5rem; /* Consistent left padding for all screens */
        }

        .footer-title {
          color: white;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          text-align: left;
        }

        .footer p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          text-align: left;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          justify-content: flex-start;
        }

        .social-icons a {
          color: white;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icons a:hover {
          color: var(--primary-color);
          background: white;
          transform: translateY(-3px);
        }

        .footer-links h6,
        .contact-info h6 {
          color: white;
          font-weight: 600;
          margin-bottom: 1.2rem;
          font-size: 1.1rem;
          text-align: left;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .footer-links li {
          margin-bottom: 0.7rem;
          text-align: left;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: white;
          text-decoration: underline;
        }

        .info-line {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          text-align: left;
        }

        .info-icon {
          width: 20px;
          margin-right: 0.7rem;
          flex-shrink: 0;
        }

        .footer-bottom {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .footer-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-brand,
          .footer-links,
          .contact-info {
            align-items: flex-start;
            margin-bottom: 2rem;
            /* REMOVED padding-left override - now uses the same 1.5rem */
          }

          .social-icons {
            justify-content: flex-start;
          }
        }

        @media (max-width: 576px) {
          .footer-title {
            font-size: 1.3rem;
          }

          .footer-links h6,
          .contact-info h6 {
            font-size: 1rem;
          }

          .social-icons a {
            width: 36px;
            height: 36px;
            font-size: 1.3rem;
          }

          /* REMOVED padding-left override - now uses the same 1.5rem */
        }
      `}</style>
    </footer>
  );
};

export default Footer;