import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappChat.css";

const WhatsappChat = () => {

  const phoneNumber = "923001234567"; 
  const message = "Hello! I need help with your store.";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      className="whatsapp-chat"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="chat-text"></span>
    </a>
  );
};

export default WhatsappChat;