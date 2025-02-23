document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".top-banner form")
	const input = document.querySelector(".top-banner input")
	const msg = document.querySelector(".top-banner .msg")
	const list = document.querySelector(".weather-section .cities")

	form.addEventListener("submit", async (e) => {
		e.preventDefault()
		const inputVal = input.value.trim()

		// Validate input
		if (!validateNameRegion(inputVal)) {
			msg.textContent = "❌ Please enter a city in 'City, State' format."
			return
		}

		const formattedInput = formatString(inputVal)

		// const existingCity = document.querySelector(
		// 	`[data-location="${formattedInput}"]`
		// )

		// if (existingCity) {
		// 	msg.textContent = `⚠️ ${inputVal} is already displayed!`
		// 	return
		// }

		try {
			const response = await fetch(`/api/weather?input=${inputVal}`)
			const weatherData = await response.json()

			if (!response.ok || weatherData.error) {
				msg.textContent = "Please search for a valid city"
				return
			}

			// Destructuring location and current
			const { current, location } = weatherData

			// Gathering all data required for our card

			// current
			const icon = `https:${current.condition.icon}`
			const iconText = current.condition.text
			const temp_f = current.temp_f

			// location
			const name = location.name
			const region = location.region

			/**
			 * Take Las Vegas, Nevada and replace whitespace with "-"
			 * Output => Las-Vegas-Nevada
			 */

			// Regex on name and regions
			const formattedName = formatString(name)
			const formattedRegion = formatString(region)
			const locationID = `${formattedName}-${formattedRegion}`.toLowerCase()

			// Create new li node
			const li = document.createElement("li")
			li.classList.add("city")
			li.setAttribute("data-location", locationID)

			li.innerHTML = `
			<div class="card">
				<div class="card-header">
					<h2>
						<span>${name}, ${region}</span>
					</h2>
				</div>
				<div class="card-content">
					<div class="city-temp">
						${Math.round(temp_f)}<sup>°F</sup>
					</div>
					<figure>
						<img class="city-icon" src="${icon}" alt="" />
						<figcaption>${iconText}</figcaption>
					</figure>
				</div>
			</div>
			`
			list.append(li)
			msg.textContent = ""
			input.value = ""
		} catch (error) {}
	})
})

function formatString(input) {
	const formattedInput = input.replace(/[\s,]+/g, "-").toLowerCase()
	return formattedInput
}

function validateNameRegion(input) {
	const pattern = /^[A-Za-z\s]+,\s*[A-Za-z\s]+$/ // Fixed regex format
	return pattern.test(input)
}
