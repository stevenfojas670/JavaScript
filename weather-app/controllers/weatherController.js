import dotenv from "dotenv"
dotenv.config()

async function getWeather(req, res) {
	const input = req.query.input
	const apiKey = process.env.WEATHERAPI_KEY

	if (!input) {
		return res.status(400).json({ message: "Invalid input." })
	}

	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}&aqi=no`

	try {
		const response = await fetch(url)
		const data = await response.json()

		if (!response.ok) {
			return res.status(400).json({ message: "Error retrieving weather data." })
		}

		return res.status(200).json(data)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal server error.", error })
	}
}

export { getWeather }
