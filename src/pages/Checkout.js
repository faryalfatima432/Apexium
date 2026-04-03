// Checkout.js - Updated with enhanced authentication and validation
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart, isLoggedIn } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: '',
    emailNews: false
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    country: 'Pakistan',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    saveInfo: false
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  
  const [billingInfo, setBillingInfo] = useState({
    country: 'Pakistan',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Countries list
  const countries = [
    'Pakistan', 'India', 'United States', 'United Kingdom', 'Canada',
    'Australia', 'Germany', 'France', 'United Arab Emirates', 'Saudi Arabia'
  ];
  
  // Cities by country
  const citiesByCountry = {
    'Pakistan': [
      'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 
      'Quetta', 'Sialkot', 'Hyderabad', 'Gujranwala', 'Abbottabad', 'Bahawalpur', 'Sargodha', 
      'Sukkur', 'Larkana', 'Sheikhupura', 'Mardan', 'Gujrat', 'Rahim Yar Khan', 'Kasur', 
      'Mingaora', 'Nawabshah', 'Sahiwal', 'Okara', 'Mirpur Khas', 'Chiniot', 'Kamoke', 
      'Sadiqabad', 'Burewala', 'Jacobabad', 'Muzaffargarh', 'Muridke', 'Jhelum', 'Shikarpur', 
      'Hafizabad', 'Kohat', 'Khanpur', 'Khuzdar', 'Dadu', 'Gojra', 'Mandi Bahauddin', 
      'Tando Allahyar', 'Daska', 'Pakpattan', 'Bahawalnagar', 'Tando Adam', 'Khairpur', 
      'Chishtian', 'Taxila', 'Nowshera', 'Umerkot', 'Charsadda', 'Jaranwala', 'Awaran', 
      'Ahmedpur East', 'Kamalia', 'Kot Addu', 'Vihari', 'Attock', 'Badin', 'Sanghar', 
      'Mianwali', 'Lodhran', 'Hasilpur', 'Kabirwala', 'Arifwala', 'Chakwal', 'Kharian', 
      'Mian Channu', 'Bhakkar', 'Leiah', 'Kamber Ali Khan', 'Jampur', 'Kundian', 'Haroonabad', 
      'Ahmadpur Sial', 'Hujra Shah Muqeem', 'Kotli', 'Narowal', 'Khushab', 'Shahdadpur', 
      'Mianwali', 'Dipalpur', 'Chunian', 'Pattoki', 'Kot Radha Kishan', 'Hasan Abdal', 
      'Tordher', 'Jahanian', 'Sarai Alamgir', 'Parachinar', 'Gwadar', 'Pasrur', 'Chitral', 
      'Qila Saifullah', 'Zhob', 'Loralai', 'Dera Ismail Khan', 'Bannu', 'Tank', 'Chaman', 
      'Kharan', 'Mastung', 'Kalat', 'Hub', 'Thatta', 'Mirpur', 'Kotri', 'Kandhkot', 
      'Kot Malik', 'Tando Muhammad Khan', 'Abdul Hakim', 'Hala', 'Kunri', 'Kot Samaba', 
      'Shahkot', 'Pishin', 'Sibi', 'Sukheke', 'Jalalpur', 'Jalalpur Pirwala', 'Haripur', 
      'Shabqadar', 'Mansehra', 'Bhimber', 'Kot Ghulam Muhammad', 'Kot Mumin', 'Tando Jam', 
      'Usta Muhammad', 'Talagang', 'Samundri', 'Jand', 'Jhawarian', 'Pabbi', 'Dunyapur', 
      'Ghakhar', 'Kot Abdul Malik', 'Kabal', 'Lakki Marwat', 'Mitha Tiwana', 'Choa Saidan Shah', 
      'Toba Tek Singh', 'Baddomalhi', 'Renala Khurd', 'Farooqabad', 'Shorkot', 'Shakargarh', 
      'Hattar', 'Liliani', 'Liaquat Pur', 'Kot Sultan', 'Kotla Arab Ali', 'Daud Khel', 
      'Phalia', 'Sui', 'Basirpur', 'Kahna', 'Gambat', 'Kotla Jam', 'Kandiaro', 'Hadali', 
      'Bhalwal', 'Kashmor', 'Chuhar Jamali', 'Malakwal', 'Warburton', 'Qadirpur Ran', 
      'Sangla Hill', 'Karor', 'Matiari', 'Kot Diji', 'Khairpur Nathan Shah', 'Havelian', 
      'Kot Deba', 'Kot Moman', 'Kot Rajkour', 'Kotla Pathan', 'Kotla Malik', 'Kotla Nawab', 
      'Kotla Syedan', 'Kotla Sobha', 'Kotla More', 'Kotla Dera', 'Kotla Ghulam', 'Kotla Shah'
    ],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Charlotte'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Belfast', 'Leicester', 'Edinburgh', 'Cardiff', 'Coventry', 'Nottingham'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria', 'Halifax', 'Oshawa', 'Windsor'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Hobart', 'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba'],
    'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg', 'Duisburg'],
    'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Khor Fakkan', 'Dibba', 'Jebel Ali', 'Ruwais', 'Ar-Rams', 'Dhaid', 'Hatta'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 'Abha', 'Taif', 'Khamis Mushait', 'Hofuf', 'Jubail', 'Yanbu', 'Qatif', 'Najran']
  };

  const shippingCost = 200;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shippingCost;

  // Enhanced authentication and validation check
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      navigate('/my-account', { state: { from: '/checkout' } });
      return;
    }

    // Redirect to shop if cart is empty and order is not complete
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [cartItems, navigate, orderComplete, isLoggedIn]);

  // Form validation function
  const validateForm = () => {
    const errors = {};

    // Contact validation
    if (!contactInfo.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      errors.email = 'Email is invalid';
    }

    // Shipping validation
    if (!shippingInfo.firstName) errors.firstName = 'First name is required';
    if (!shippingInfo.lastName) errors.lastName = 'Last name is required';
    if (!shippingInfo.address) {
      errors.address = 'Address is required';
    } else if (shippingInfo.address.split(' ').length < 12) {
      errors.address = 'Please provide complete address with at least 12 words';
    }
    if (!shippingInfo.city) errors.city = 'City is required';
    if (!shippingInfo.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Billing validation if different from shipping
    if (!billingSameAsShipping) {
      if (!billingInfo.firstName) errors.billingFirstName = 'First name is required';
      if (!billingInfo.lastName) errors.billingLastName = 'Last name is required';
      if (!billingInfo.address) {
        errors.billingAddress = 'Address is required';
      } else if (billingInfo.address.split(' ').length < 12) {
        errors.billingAddress = 'Please provide complete address with at least 12 words';
      }
      if (!billingInfo.city) errors.billingCity = 'City is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (billingSameAsShipping && name !== 'saveInfo') {
      setBillingInfo(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    const errorKey = `billing${name.charAt(0).toUpperCase() + name.slice(1)}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleCountryChange = (country, type) => {
    if (type === 'shipping') {
      setShippingInfo(prev => ({ ...prev, country, city: '' }));
      if (billingSameAsShipping) {
        setBillingInfo(prev => ({ ...prev, country, city: '' }));
      }
    } else {
      setBillingInfo(prev => ({ ...prev, country, city: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.is-invalid');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Order submitted:', {
        contactInfo,
        shippingInfo,
        billingInfo: billingSameAsShipping ? shippingInfo : billingInfo,
        paymentMethod,
        cartItems,
        total
      });
      
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (!isLoggedIn) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" style={{ color: '#49aea2' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Redirecting to login...</p>
      </Container>
    );
  }

  if (orderComplete) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Alert variant="success" className="py-5">
              <div className="mb-4">
                <i className="fas fa-check-circle" style={{ fontSize: '4rem', color: '#49aea2' }}></i>
              </div>
              <h2>Order Complete!</h2>
              <p className="lead">Thank you for your purchase. Your order has been placed successfully.</p>
              <p className="text-muted">You will receive a confirmation email shortly.</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/shop')}
                style={{ backgroundColor: '#49aea2', borderColor: '#49aea2' }}
                size="lg"
              >
                Continue Shopping
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid="lg" className="my-4 checkout-container">
      <h1 className="mb-4 text-center" style={{ color: '#49aea2' }}>Checkout</h1>
      
      <Row className="checkout-row">
        {/* Left Side - Checkout Form */}
        <Col lg={8} className="mb-4 checkout-form-col">
          <Form onSubmit={handleSubmit} className="checkout-form" noValidate>
            {/* Contact Section */}
            <Card className="mb-4 checkout-card">
              <Card.Header className="checkout-card-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
                <h5 className="mb-0">Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactChange}
                    placeholder="your@email.com"
                    required
                    className={`checkout-input ${formErrors.email ? 'is-invalid' : ''}`}
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  name="emailNews"
                  label="Email me with news and offers"
                  checked={contactInfo.emailNews}
                  onChange={handleContactChange}
                  className="checkout-checkbox"
                />
              </Card.Body>
            </Card>

            {/* Delivery Section */}
            <Card className="mb-4 checkout-card">
              <Card.Header className="checkout-card-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
                <h5 className="mb-0">Shipping Address</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Country/Region *</Form.Label>
                  <Form.Select
                    value={shippingInfo.country}
                    onChange={(e) => handleCountryChange(e.target.value, 'shipping')}
                    className="checkout-select"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        required
                        className={`checkout-input ${formErrors.firstName ? 'is-invalid' : ''}`}
                        isInvalid={!!formErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        required
                        className={`checkout-input ${formErrors.lastName ? 'is-invalid' : ''}`}
                        isInvalid={!!formErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Complete Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="Enter your complete address with nearest landmark..."
                    required
                    minLength={50}
                    className={`checkout-textarea ${formErrors.address ? 'is-invalid' : ''}`}
                    isInvalid={!!formErrors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.address}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted address-hint">
                    Please provide complete address with nearest landmark (at least 12 words)
                  </Form.Text>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City *</Form.Label>
                      <Form.Select
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                        className={`checkout-select ${formErrors.city ? 'is-invalid' : ''}`}
                        isInvalid={!!formErrors.city}
                      >
                        <option value="">Select City</option>
                        {citiesByCountry[shippingInfo.country]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Postal Code (optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        className="checkout-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    placeholder="03XXXXXXXXX"
                    required
                    className={`checkout-input ${formErrors.phone ? 'is-invalid' : ''}`}
                    isInvalid={!!formErrors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  name="saveInfo"
                  label="Save this information for next time"
                  checked={shippingInfo.saveInfo}
                  onChange={handleShippingChange}
                  className="checkout-checkbox"
                />
              </Card.Body>
            </Card>

            {/* Shipping Method */}
            <Card className="mb-4 checkout-card">
              <Card.Header className="checkout-card-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
                <h5 className="mb-0">Shipping Method</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <Form.Check
                    type="radio"
                    name="shippingMethod"
                    id="freeDelivery"
                    label="Standard Delivery"
                    checked
                    readOnly
                    className="checkout-radio"
                  />
                  <div>
                    <span className="text-success fw-bold">FREE</span>
                    <small className="text-muted ms-2">5-7 business days</small>
                  </div>
                </div>
              </Card.Body>
            </Card>

          {/* Payment Section */}
<Card className="mb-4 checkout-card">
  <Card.Header className="checkout-card-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
    <h5 className="mb-0">Payment Method</h5>
  </Card.Header>
  <Card.Body>
    <p className="text-muted small mb-3">All transactions are secure and encrypted.</p>
    
    <Form.Group className="mb-3">
      <Form.Check
        type="radio"
        name="paymentMethod"
        id="cod"
        label="Cash on Delivery (COD)"
        checked={paymentMethod === 'cod'}
        onChange={() => setPaymentMethod('cod')}
        className="checkout-radio"
      />
      <Form.Text className="text-muted">
        Pay when you receive your order
      </Form.Text>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Check
        type="radio"
        name="paymentMethod"
        id="payfast"
        label="PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)"
        checked={paymentMethod === 'payfast'}
        onChange={() => setPaymentMethod('payfast')}
        className="checkout-radio"
      />
      <div className="ms-4 mt-2 payment-icons">
        <div className="d-flex flex-wrap gap-2">
          <span className="badge bg-light text-dark border payment-badge">VISA</span>
          <span className="badge bg-light text-dark border payment-badge">mastercard</span>
          <span className="badge bg-light text-dark border payment-badge">easypyisa</span>
          <span className="badge bg-light text-dark border payment-badge">Daraz Wallet</span>
          <span className="badge bg-light text-dark border payment-badge">HBL</span>
          <span className="badge bg-light text-dark border payment-badge">UnionPay</span>
          <span className="badge bg-light text-dark border payment-badge">HABIB BANK</span>
          <span className="badge bg-light text-dark border payment-badge">Easy Monthly</span>
         
          <span className="badge bg-light text-dark border payment-badge">Installments</span>
        </div>
      </div>
    </Form.Group>
  </Card.Body>
</Card>

            {/* Billing Address */}
            <Card className="mb-4 checkout-card">
              <Card.Header className="checkout-card-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
                <h5 className="mb-0">Billing Address</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    name="billingAddress"
                    id="sameAsShipping"
                    label="Same as shipping address"
                    checked={billingSameAsShipping}
                    onChange={() => setBillingSameAsShipping(true)}
                    className="checkout-radio"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    name="billingAddress"
                    id="differentBilling"
                    label="Use a different billing address"
                    checked={!billingSameAsShipping}
                    onChange={() => setBillingSameAsShipping(false)}
                    className="checkout-radio"
                  />
                </Form.Group>

                {!billingSameAsShipping && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Country/Region *</Form.Label>
                      <Form.Select
                        value={billingInfo.country}
                        onChange={(e) => handleCountryChange(e.target.value, 'billing')}
                        className="checkout-select"
                      >
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>First Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={billingInfo.firstName}
                            onChange={handleBillingChange}
                            required
                            className={`checkout-input ${formErrors.billingFirstName ? 'is-invalid' : ''}`}
                            isInvalid={!!formErrors.billingFirstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.billingFirstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Last Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={billingInfo.lastName}
                            onChange={handleBillingChange}
                            required
                            className={`checkout-input ${formErrors.billingLastName ? 'is-invalid' : ''}`}
                            isInvalid={!!formErrors.billingLastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.billingLastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Complete Address *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={billingInfo.address}
                        onChange={handleBillingChange}
                        placeholder="Enter your complete billing address with nearest landmark..."
                        required
                        minLength={50}
                        className={`checkout-textarea ${formErrors.billingAddress ? 'is-invalid' : ''}`}
                        isInvalid={!!formErrors.billingAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.billingAddress}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>City *</Form.Label>
                          <Form.Select
                            name="city"
                            value={billingInfo.city}
                            onChange={handleBillingChange}
                            required
                            className={`checkout-select ${formErrors.billingCity ? 'is-invalid' : ''}`}
                            isInvalid={!!formErrors.billingCity}
                          >
                            <option value="">Select City</option>
                            {citiesByCountry[billingInfo.country]?.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {formErrors.billingCity}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Postal Code (optional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="postalCode"
                            value={billingInfo.postalCode}
                            onChange={handleBillingChange}
                            className="checkout-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group>
                      <Form.Label>Phone (optional)</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleBillingChange}
                        className="checkout-input"
                      />
                    </Form.Group>
                  </>
                )}
              </Card.Body>
            </Card>

            <Button 
              variant="primary" 
              type="submit" 
              size="lg" 
              className="w-100 checkout-button"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: '#49aea2', 
                borderColor: '#49aea2',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '1rem',
                borderRadius: '8px'
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Processing Order...
                </>
              ) : (
                `Complete Order - RS ${total.toLocaleString('en-IN')}`
              )}
            </Button>
          </Form>
        </Col>

        {/* Right Side - Order Summary */}
        <Col lg={4} className="checkout-summary-col">
          <Card className="checkout-summary-card">
            <Card.Header className="checkout-summary-header" style={{ backgroundColor: '#49aea2', borderColor: '#49aea2', color: 'white' }}>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body className="checkout-summary-body">
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item d-flex mb-3 pb-3 border-bottom">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="order-item-image rounded me-3"
                    />
                    <div className="order-item-details flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="order-item-name mb-1">{item.name}</h6>
                        {item.sale && (
                          <Badge 
                            bg="primary" 
                            className="sale-badge ms-2"
                            style={{ backgroundColor: '#49aea2' }}
                          >
                            Sale
                          </Badge>
                        )}
                      </div>
                      <p className="order-item-quantity text-muted small mb-1">Qty: {item.quantity}</p>
                      <p className="order-item-price fw-bold mb-0" style={{ color: '#49aea2' }}>
                        RS {item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-totals mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>RS {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-success fw-bold' : ''}>
                    {shippingCost === 0 ? 'FREE' : `RS ${shippingCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 total-amount">
                  <span>Total</span>
                  <span style={{ color: '#49aea2' }}>RS {total.toLocaleString('en-IN')}</span>
                </div>
                <small className="text-muted">Inclusive of all taxes</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS Styles */}
      <style jsx>{`
        .checkout-container {
          min-height: 100vh;
        }
        
        .checkout-row {
          align-items: flex-start;
        }
        
        /* Order Summary Card - Fixed positioning for desktop */
        .checkout-summary-card {
          position: sticky;
          top: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }
        
        .checkout-summary-body {
          padding: 1.25rem;
          max-height: 70vh;
          overflow-y: auto;
        }
        
        .order-item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          flex-shrink: 0;
        }
        
        .order-item-name {
          font-size: 0.9rem;
          line-height: 1.3;
        }
        
        .sale-badge {
          font-size: 0.7rem;
          white-space: nowrap;
        }
        
        .order-item-quantity {
          font-size: 0.8rem;
        }
        
        .order-item-price {
          font-size: 0.9rem;
        }
          /* Payment badge styles */
.payment-badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-weight: 500;
}

/* Mobile responsive payment badges */
@media (max-width: 768px) {
  .payment-badge {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  
  .payment-icons .d-flex {
    gap: 0.3rem !important;
  }
}

@media (max-width: 576px) {
  .payment-badge {
    font-size: 0.65rem;
    padding: 0.25rem 0.4rem;
  }
}
        
        /* Form Styles */
        .checkout-card {
          border: 1px solid #e0e0e0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .checkout-input, .checkout-select, .checkout-textarea {
          border-radius: 4px;
          border: 1px solid #ddd;
          padding: 0.75rem;
        }
        
        .checkout-input:focus, .checkout-select:focus, .checkout-textarea:focus {
          border-color: #49aea2;
          box-shadow: 0 0 0 0.2rem rgba(73, 174, 162, 0.25);
        }
        
        .checkout-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .address-hint {
          font-size: 0.8rem;
        }
        
        .checkout-checkbox, .checkout-radio {
          margin-bottom: 0.5rem;
        }
        
        .payment-icons {
          font-size: 1.1rem;
        }
        
        .checkout-button:hover:not(:disabled) {
          background-color: #3a8a80 !important;
          border-color: #3a8a80 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(73, 174, 162, 0.3);
        }
        
        .checkout-button:disabled {
          opacity: 0.7;
        }
        
        /* Mobile Styles */
        @media (max-width: 991.98px) {
          .checkout-summary-card {
            position: static;
            margin-top: 0;
            margin-bottom: 2rem;
          }
          
          .checkout-summary-body {
            max-height: none;
            overflow-y: visible;
          }
          
          .checkout-form-col {
            order: 2;
          }
          
          .checkout-summary-col {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .checkout-container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          h1 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem !important;
          }
          
          .checkout-card-header h5 {
            font-size: 1.1rem;
          }
          
          .checkout-input, .checkout-select, .checkout-textarea {
            font-size: 16px;
            padding: 0.6rem;
          }
          
          .order-item-image {
            width: 50px;
            height: 50px;
          }
          
          .order-item-name {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 576px) {
          .checkout-container {
            padding-left: 10px;
            padding-right: 10px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .checkout-card {
            margin-bottom: 1rem;
          }
          
          .checkout-card-header {
            padding: 0.75rem 1rem;
          }
          
          .checkout-card-header h5 {
            font-size: 1rem;
          }
          
          .checkout-summary-body {
            padding: 1rem;
          }
          
          .order-item-image {
            width: 45px;
            height: 45px;
          }
        }
        
        /* Scrollbar styling */
        .checkout-summary-body::-webkit-scrollbar {
          width: 6px;
        }
        
        .checkout-summary-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .checkout-summary-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .checkout-summary-body::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </Container>
  );
};

export default Checkout;