// server.js
const aedes = require("aedes")();
const http = require("http");
const ws = require("websocket-stream");

// Create HTTP server
const server = http.createServer();

// Attach WebSocket server to HTTP
ws.createServer({ server: server }, aedes.handle);

// Use Render's PORT (provided in env) or default to 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 MQTT broker running on ws://localhost:${PORT}`);
});

// Event handlers
aedes.on("client", client => {
  console.log("🔌 Client connected:", client ? client.id : "unknown");
});

aedes.on("publish", (packet, client) => {
  if (client) {
    console.log(`📩 ${client.id} published ${packet.topic}: ${packet.payload.toString()}`);
  }
});
