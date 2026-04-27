import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Newsletter */}

      <div className="newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <p>Get updates about new products and special offers</p>

        <div className="newsletter-box">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>


      {/* Main Footer */}

      <div className="footer-container">

        {/* Company */}

        <div className="footer-col">
          <h2 >Apexium</h2>
          <p>
            Apexium is a trusted online store providing quality products,
            secure payments and fast delivery across Pakistan.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>


        {/* Customer Service */}

        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li>Help Center</li>
            <li>How to Buy</li>
            <li>Track Order</li>
            <li>Return Policy</li>
            <li ><a href="/contact" className="footer-link">Contact Us</a></li>
          </ul>
        </div>


        {/* Categories */}

        <div className="footer-col">
          <h3>Categories</h3>
          <ul>
            <li><a href="/categorypage">Category</a></li>
            <li>Perfumes</li>
            <li>Fashion</li>
            <li>Accessories</li>
            <li>New Arrivals</li>
          </ul>
        </div>


        {/* App Download */}

        <div className="footer-col">
          <h3>Download App</h3>

          <div className="app-buttons">
            <button className="app-btn">
              <FaGooglePlay /> Google Play
            </button>

            <button className="app-btn">
              <FaApple /> App Store
            </button>
          </div>

          {/* <h4 className="payment-title">Secure Payments</h4> */}

          <div className="payment-icons">
            {/* <img src="/visa.png" alt="visa" />
            <img src="/mastercard.png" alt="mastercard" />
            <img src="/paypal.png" alt="paypal" /> */}
          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Apexium. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;