import dotenv from "dotenv"
dotenv.config()

import http from "http"
import app from "./app.js"
import connectDB from "./config/db.js"
import { initSocket } from "./utils/socket.js"

const PORT = process.env.PORT || 5000

// Create HTTP server from Express app
// Socket.io needs raw HTTP server
// not just Express app ✅
const server = http.createServer(app)

// Initialize Socket.io
initSocket(server)
console.log("🔌 Socket.io initialized")

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error(`❌ Failed: ${error.message}`)
    process.exit(1)
  })