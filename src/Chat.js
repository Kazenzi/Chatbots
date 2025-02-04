import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post('http://localhost:3000/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply || 'No reply received' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Error: Could not get response' }]);
    }

    setInput('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: msg.sender === 'user' ? '#007bff' : '#f1f1f1', color: msg.sender === 'user' ? '#fff' : '#000' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: 'calc(100% - 60px)', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
