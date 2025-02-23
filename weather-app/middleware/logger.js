// Created with ChatGPT

import fs from "fs"
import path from "path"
import morgan from "morgan"

const logDirectory = path.join(process.cwd(), "logs")

// Create a write stream in append mode for logging requests to a file
const logStream = fs.createWriteStream(path.join("logs", "requests.log"), {
	flags: "a",
})

// Middleware to log requests
const requestLogger = morgan(
	"[:date[iso]] :method :url :status :response-time ms - :res[content-length]",
	{
		stream: logStream,
	}
)

// Middleware to log request and response details manually
const apiLogger = (req, res, next) => {
	const startTime = Date.now()

	// Capture response body
	const oldJson = res.json

	res.json = function (data) {
		const duration = Date.now() - startTime

		const logEntry = {
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.originalUrl,
			status: res.statusCode,
			responseTime: `${duration}ms`,
			requestBody: req.body,
			responseBody: data,
		}

		// Log to console
		console.log(JSON.stringify(logEntry, null, 2))

		// Append to file asynchronously
		fs.appendFile(
			path.join(logDirectory, "api.log"),
			JSON.stringify(logEntry) + "\n",
			(err) => {
				if (err) console.error("Error writing log file:", err)
			}
		)

		// Restore original res.json
		return oldJson.call(this, data)
	}

	next()
}

export { requestLogger, apiLogger }
