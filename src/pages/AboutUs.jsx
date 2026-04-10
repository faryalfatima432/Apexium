import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About Our Store</h1>
          <p>Your trusted online shopping destination</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section container">
        <div className="about-grid">

          <div className="about-img">
            <img src="/images/About1.png" alt="about" />
          </div>

          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              We are a modern ecommerce platform providing high quality
              products with fast delivery and secure payments. Our goal is
              to make online shopping simple and affordable for everyone.
            </p>

            <p>
              Thousands of customers trust our store for quality products
              and excellent customer service.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="about-section container">
        <div className="about-grid reverse">

          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to deliver the best shopping experience to
              customers by offering premium quality products at competitive
              prices with reliable delivery services.
            </p>

            <p>
              We aim to make online shopping faster, easier and more secure.
            </p>
          </div>

          <div className="about-img">
            <img src="/images/About2.png" alt="mission" />
          </div>

        </div>
      </section>

      {/* VISION */}
      <section className="about-section container">
        <div className="about-grid">

          <div className="about-img">
            <img src="/images/ab4.png" alt="vision" />
          </div>

          <div className="about-text">
            <h2>Our Vision</h2>
            <p>
              Our vision is to become one of the most trusted ecommerce
              platforms by providing innovative solutions and excellent
              customer satisfaction.
            </p>

            <p>
              We believe in technology, transparency and building long term
              relationships with our customers.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;