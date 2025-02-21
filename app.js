const apiKey = "####"

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".top-banner form")
	const input = document.querySelector(".top-banner input")
	const msg = document.querySelector(".top-banner .msg")
	const list = document.querySelector(".ajax-section .cities")

	form.addEventListener("submit", async (e) => {
		e.preventDefault()
		const inputVal = input.value

		// Ensure inputVal is not empty
		if (inputVal.length == 0) {
			return
		}

		// Check if a card already exists
		const listItems = document.querySelector(".ajax-section .city")
		const listItemsArray = Array.from(listItems)

		console.log(listItemsArray)

		if (listItemsArray.length > 0) {
			const filteredArray = listItemsArray.filter((el) => {
				let content = ""

				if (inputVal.includes(",")) {
					inputVal = inputVal.split(",")[0]
					content = el
						.querySelector(".city-name span")
						.textContent.toLowerCase()
				}
			})
		}

		const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputVal}&aqi=no`

		const response = await fetch(url)
		const weatherData = await response.json()

		if (!response.ok) {
			msg.textContent = "Please search for a valid city"
		}

		console.log(weatherData)

		// Destructuring location and current
		const { current, location } = weatherData

		// Gathering all data required for our card

		// current
		const icon = `https:${current.condition.icon}`
		const iconText = current.condition.text
		const temp_f = current.temp_f
		const temp_c = current.temp_c
		const last_updated = current.last_updated

		// location
		const name = location.name
		const region = location.region
		const country = location.country

		// Create new li node
		const li = document.createElement("li")
		li.classList.add("city")
		const markup = `
        <h2 class="city-name" data-name="${name},${region}">
            <span>${name}</span>
            <sup>${region}</sup>
        </h2>
        <div class="city-
        <div class="city-temp">
            ${Math.round(temp_f)}<sup>°F</sup>
        </div>
        <figure>
            <img class="city-icon" src="${icon}" alt="" />
            <figcaption>${iconText}</figcaption>
        </figure>
        `
		li.innerHTML = markup
		list.appendChild(li)
	})
})
