import express from "express"
import fs from "fs"
import weatherRoutes from "./routes/weatherRoute.js"
import { requestLogger, apiLogger } from "./middleware/logger.js"

const app = express()

// Ensuring a directory for logs exists
if (!fs.existsSync("logs")) {
	fs.mkdirSync("logs")
}

// Middleware
app.use(express.json())
app.use(express.static("public"))
app.use(requestLogger)
app.use(apiLogger)

// Routes
app.use("/api/weather", weatherRoutes)

const port = 3000
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
