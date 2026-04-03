// MyAccount.js - Updated with login callback and Buy Now redirect
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const MyAccount = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  // Check for buy now intent
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('buyNow') === 'true') {
      // You can show a message or change UI to indicate buy now intent
      console.log('Buy Now intent detected');
    }
  }, []);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      contactNumber: formData.get('contactNumber'),
      password: formData.get('password')
    };
    
    // Store login data in localStorage
    localStorage.setItem('userLoginData', JSON.stringify(loginData));
    
    // Call the login callback
    if (onLogin) {
      onLogin();
    }
    
    // Check for buy now intent
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('buyNow') === 'true') {
      // Redirect to checkout for buy now
      navigate('/checkout');
    } else {
      // Redirect to previous page or home
      const from = location.state?.from || '/';
      navigate(from);
    }
  };

  // Handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registerData = {
      fullName: formData.get('fullName'),
      contactNumber: formData.get('contactNumber'),
      password: formData.get('password')
    };
    
    // Store registration data in localStorage
    localStorage.setItem('userData', JSON.stringify(registerData));
    
    // Switch to login tab after registration
    setActiveTab('login');
    
    // Show success message
    alert('Registration successful! Please login to continue.');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header style={{ backgroundColor: '#49aea2', color: 'white' }}>
              <h3 className="mb-0 text-center">My Account</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="pills" className="mb-4 justify-content-center">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="login"
                      style={{ 
                        backgroundColor: activeTab === 'login' ? '#49aea2' : 'transparent',
                        color: activeTab === 'login' ? 'white' : '#49aea2',
                        border: '1px solid #49aea2',
                        width: '120px',
                        textAlign: 'center'
                      }}
                    >
                      Login
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="register"
                      style={{ 
                        backgroundColor: activeTab === 'register' ? '#49aea2' : 'transparent',
                        color: activeTab === 'register' ? 'white' : '#49aea2',
                        border: '1px solid #49aea2',
                        width: '120px',
                        textAlign: 'center'
                      }}
                    >
                      Register
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="contactNumber"
                          placeholder="Enter your contact number" 
                          required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password"
                          placeholder="Enter your password" 
                          required 
                        />
                      </Form.Group>
                      <div className="mb-3 text-end">
                        <Button 
                          variant="link" 
                          className="p-0 text-decoration-none"
                          style={{ color: '#49aea2' }}
                        >
                          Forgot Password?
                        </Button>
                      </div>
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100"
                        style={{ 
                          backgroundColor: '#49aea2', 
                          borderColor: '#49aea2',
                          height: '45px'
                        }}
                      >
                        Login
                      </Button>
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="register">
                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="fullName"
                          placeholder="Enter your full name" 
                          required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="contactNumber"
                          placeholder="Enter your contact number" 
                          required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password"
                          placeholder="Enter your password" 
                          required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="confirmPassword"
                          placeholder="Confirm your password" 
                          required 
                        />
                      </Form.Group>
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100"
                        style={{ 
                          backgroundColor: '#49aea2', 
                          borderColor: '#49aea2',
                          height: '45px'
                        }}
                      >
                        Register
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .nav-link {
          width: 120px;
          text-align: center;
          margin: 0 5px;
        }
        
        @media (max-width: 576px) {
          .nav-link {
            width: 100px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 400px) {
          .nav-link {
            width: 90px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default MyAccount;