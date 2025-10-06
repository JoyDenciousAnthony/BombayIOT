const aedes = require("aedes")();
const http = require("http");
const ws = require("websocket-stream");

// Create HTTP server
const server = http.createServer((req, res) => {
  // Respond 200 OK to any HTTP request (for Render health check)
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("MQTT broker is running\n");
});

// Attach WebSocket server to the same HTTP server
ws.createServer({ server }, aedes.handle);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 MQTT broker running on ws://localhost:${PORT}`);
});

aedes.on("client", (client) => {
  console.log("🔌 Client connected:", client ? client.id : "unknown");
});

aedes.on("publish", (packet, client) => {
  if (client) {
    console.log(`📩 ${client.id} published ${packet.topic}: ${packet.payload.toString()}`);
  }
});

aedes.on("clientDisconnect", (client) => {
  console.log("❌ Client disconnected:", client ? client.id : "unknown");
});

aedes.on("error", (err) => {
  console.error("⚠️ Broker error:", err);
});
