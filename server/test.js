import express from "express";
import { WebSocketServer } from "ws";  // Correct import for WebSocketServer

const app = express();
const port = 5500;  // Changed port to 5500

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Set up WebSocket server using WebSocketServer
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    // Parse the incoming buffer (the message is sent as a Buffer)
    const parsedMessage = JSON.parse(message.toString());

    console.log("Received message:", parsedMessage);

    // Broadcast the received message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {  // Use `ws.OPEN` to check if the WebSocket is open
        client.send(JSON.stringify(parsedMessage));  // Send back the parsed message
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
