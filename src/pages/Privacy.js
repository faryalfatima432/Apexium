import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Privacy = () => {
  return (
    <Container className="my-5 py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="text-center mb-4">Privacy Policy</h1>
          <p className="text-muted text-center">Last updated: September 26, 2025</p>
          
          <div className="privacy-content">
            <p>At Shopping by apexiums, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>
            
            <h3>Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information when you make a purchase or create an account.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance your shopping experience and analyze website traffic.</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders, account, or inquiries</li>
              <li>To improve our website, products, and services</li>
              <li>To send promotional emails (only with your consent)</li>
              <li>To prevent fraud and enhance security</li>
            </ul>
            
            <h3>Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. All payment transactions are encrypted using SSL technology.</p>
            
            <h3>Third-Party Disclosure</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
            
            <h3>Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            
            <h3>Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Privacy;