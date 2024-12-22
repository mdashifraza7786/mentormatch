import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Chat = ({ userId, mentorId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Connect to the Socket.io server
    socket.current = io("http://localhost:5000"); // Replace with your backend URL

    // Join a specific room for mentor-mentee chat
    const roomId = `${userId}-${mentorId}`;
    socket.current.emit("joinRoom", roomId);

    // Listen for incoming messages
    socket.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, [userId, mentorId]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const message = {
      senderId: userId,
      text: inputMessage,
      timestamp: new Date(),
    };

    // Emit the message to the server
    socket.current.emit("sendMessage", {
      roomId: `${userId}-${mentorId}`,
      message,
    });

    // Update the chat UI locally
    setMessages((prev) => [...prev, message]);
    setInputMessage("");
  };

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-purple-600 text-white py-3 px-6 text-xl font-semibold shadow-md">
        Chat with Mentor/Mentee
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-200 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
