// Notifications.js
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Order Shipped', message: 'Your order #12345 has been shipped', time: '2 hours ago', unread: true },
    { id: 2, title: 'Special Offer', message: 'Get 20% off on all perfumes', time: '1 day ago', unread: true },
    { id: 3, title: 'Order Delivered', message: 'Your order #12344 has been delivered', time: '3 days ago', unread: false },
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Notifications</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {notifications.map(notification => (
                  <ListGroup.Item key={notification.id} className="p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">
                          {notification.title}
                          {notification.unread && <Badge bg="danger" className="ms-2">New</Badge>}
                        </h6>
                        <p className="mb-1">{notification.message}</p>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;