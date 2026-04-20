import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import batchRoutes from "./routes/batchRoutes.js"

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/batch", batchRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({ message: "🌱 AgriChain Backend is running!" })
})

export default app