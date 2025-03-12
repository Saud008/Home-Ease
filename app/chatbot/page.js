'use client';

import { useState, useRef, useEffect } from 'react';
import './chatbot.css';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    try {
      setIsLoading(true);
      // Add user message to chat
      const updatedChat = [...chat, { role: 'user', content: message }];
      setChat(updatedChat);
      setMessage('');

      // Send message to API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();

      // Add AI reply to chat
      setChat([...updatedChat, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setChat([...chat, { role: 'error', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${!isOpen ? 'closed' : ''}`} onClick={!isOpen ? toggleChat : undefined}>
      <div className="chatbot-window">
        {isOpen ? (
          <>
            <div className="chatbot-header">
              <div className="chatbot-title">
                <span>💬</span>
                <span>HomeEase AI Assistant</span>
              </div>
              <button onClick={toggleChat} className="close-button">
                ×
              </button>
            </div>

            <div ref={chatContainerRef} className="chat-messages">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`message-bubble ${
                    msg.role === 'user' 
                      ? 'user-message' 
                      : msg.role === 'error' 
                      ? 'error-message' 
                      : 'ai-message'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="message-bubble ai-message typing-indicator">
                  <span>AI is typing</span>
                  <div className="typing-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="chat-input"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || message.trim() === ''}
                  className="send-button"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span>💬</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 