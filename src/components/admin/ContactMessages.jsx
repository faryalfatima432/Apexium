import React, { useEffect, useState } from "react";
import "./ContactMessages.css";

const ContactMessages = () => {

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [messages,setMessages] = useState([]);

  useEffect(()=>{

    fetch(`${backend_url}/api/contact`)
    .then(res=>res.json())
    .then(data=>setMessages(data));

  },[]);

  const deleteMessage = async(id)=>{

    await fetch(`${backend_url}/api/contact/${id}`,{
      method:"DELETE"
    });

    setMessages(messages.filter(m=>m._id!==id));

  };

  return (

    <div className="contact-messages">
      <div className="management-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-envelope"></i>
            Contact Messages
          </h1>
          <p>Review and manage inbox messages from your site visitors.</p>
        </div>
      </div>

      <div className="messages-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );

};

export default ContactMessages;