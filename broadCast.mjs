import express from "express";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname for ES Modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const PORT = 7272;
const HOST = "128.16.66.169"; // Change this to match your server IP

// Serve Next.js build files
app.use(express.static(path.join(__dirname, ".next")));

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("🔗 New WebSocket connection established");

  ws.on("message", (message) => {
    // console.log(`📩 Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {

        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ WebSocket connection closed");
  });
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});

export default server;
