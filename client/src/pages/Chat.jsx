import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Chat = ({ userId, mentorId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loader state
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

    // Simulate initial loading for demonstration
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the duration as needed

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
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Header */}
      <div className="bg-purple-600 text-white py-4 px-6 text-2xl font-semibold shadow-lg">
        Chat with Mentor/Mentee
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-xl shadow-md ${
                    msg.senderId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div className="bg-white p-4 shadow-md">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
