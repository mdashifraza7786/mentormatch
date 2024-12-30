import React, { useState, useEffect } from "react";

const Test = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:5001");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, receivedMessage.message]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    if (socket) {
      const message = { message: inputMessage };
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>
      <div>
        <h2>Messages</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Test;
