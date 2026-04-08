import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get(`${backend_url}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myOrder = res.data.find(o => o._id === id);
        setOrder(myOrder);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Placed Successfully!</h2>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <h3>Items:</h3>
      <ul>
        {order.products.map(item => (
          <li key={item.product}>
            {item.name} x {item.quantity} - Rs {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: Rs {order.totalAmount}</h3>
    </div>
  );
};

export default OrderSuccess;