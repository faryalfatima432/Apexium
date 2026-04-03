import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5 py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="text-center mb-4">About Shopping by apexiums</h1>
          <div className="about-content">
            <p className="lead">Welcome to Shopping by apexiums, your trusted online shopping destination since 2023.</p>
            
            <h3>Our Story</h3>
            <p>Founded in 2025, Shopping by apexiums began with a simple mission: to provide high-quality products at affordable prices with exceptional customer service. What started as a small venture has grown into a trusted e-commerce platform serving customers across the country.</p>
            
            <h3>Our Values</h3>
            <ul>
              <li><strong>Quality:</strong> We carefully select each product in our inventory to ensure it meets our high standards.</li>
              <li><strong>Affordability:</strong> We believe everyone deserves access to quality products without breaking the bank.</li>
              <li><strong>Customer Satisfaction:</strong> Your happiness is our priority. Our support team is always ready to assist you.</li>
              <li><strong>Innovation:</strong> We continuously improve our platform to provide a seamless shopping experience.</li>
            </ul>
            
            <h3>Why Choose Us?</h3>
            <p>With countless online shopping options available, we stand out through our commitment to:</p>
            <Row className="mt-4">
              <Col md={6} className="mb-3">
                <h5>Fast Shipping</h5>
                <p>We process orders within 24 hours and partner with reliable delivery services.</p>
              </Col>
              <Col md={6} className="mb-3">
                <h5>Secure Payments</h5>
                <p>Our payment system uses encryption technology to protect your information.</p>
              </Col>
              <Col md={6} className="mb-3">
                <h5>Easy Returns</h5>
                <p>Not satisfied with your purchase? Our return process is simple and hassle-free.</p>
              </Col>
              <Col md={6} className="mb-3">
                <h5>24/7 Support</h5>
                <p>Our customer service team is available around the clock to assist you.</p>
              </Col>
            </Row>
            
            <div className="mt-5 p-4 bg-light rounded">
              <h4 className="text-center">Have Questions?</h4>
              <p className="text-center mb-0">Reach out to our friendly support team at support@apexiums.com or call us at +92 340 5542097</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;