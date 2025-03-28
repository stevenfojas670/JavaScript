/**
 * Problem 1: Basic Delay function
 * Create a function delay(ms) that returns a Promise after ms milliseconds
 */

function delay(ms) {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => resolve('Resolved'), ms);
		} catch (e) {
			reject(e);
		}
	});
}

// delay(5000).then(
// 	(e) => console.log(`${e}: 5 seconds has passed.`),
// 	(e) => console.log(e)
// );

/**
 * Problem 2: Fetch JSON Placeholder Post
 * Use fetch and Promises to get a post from
 * https://jsonplaceholder.typicode.com/posts/1
 * and log the title
 */

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
// 	method: 'get',
// })
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);
// 	});

/**
 * Problem 3: Promise All
 * You have three APIs that return different data at different times.
 * Use Promise.all() to run them in parallel and log when complete
 */
function api1() {
	return new Promise((resolve) => setTimeout(() => resolve('API 1'), 1000));
}
function api2() {
	return new Promise((resolve) => setTimeout(() => resolve('API 2'), 1500));
}
function api3() {
	return new Promise((resolve) => setTimeout(() => resolve('API 3'), 500));
}

// Expected output: ["API 1", "API 2", "API 3"] (after ~1.5s)
// Promise.all([api1(), api2(), api3()])
// 	.then((results) => {
// 		console.log(results);
// 	})
// 	.catch((error) => {
// 		console.error('One of the API calls failed: ', error);
// 	});

/**
 * Problem 4. Promise Race
 * Use Promise.race() to find which promise finishes first
 */

const p1 = new Promise((resolve) => setTimeout(() => resolve('A'), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve('B'), 200));
const p3 = new Promise((resolve) => setTimeout(() => resolve('C'), 100));

// Output: "C"

// Promise.race([p1, p2, p3])
// 	.then((e) => console.log(e))
// 	.catch((error) => {
// 		console.log('One of the APIs failed: ', error);
// 	});

/**
 * Problem 5. Retry on failure
 * Write a function fetchWithRetry(url, retries) that retries to fetch a URL.
 * If it fails, it retries up to `retries` times before throwing an error.
 */

async function fetchWithRetry(url, options, retries, baseDelay = 500) {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await fetch(url, { ...options });

			if (!response.ok)
				throw new Error(`HTTP error! Status ${response.status}`);

			const data = await response.json();
			return data;
		} catch (error) {
			if (attempt < retries) {
				const wait = baseDelay * 2 ** (attempt - 1);
				console.warn(`Attempt ${attempt}: Retrying in ${wait}ms...`);
				await delay(wait);
			} else {
				throw new Error(
					`Connection failed after ${attempt} attempts: ${error.message}`
				);
			}
		}
	}
}

// fetchWithRetry(
// 	'http://localhost:3000/api/users',
// 	{
// 		method: 'get',
// 	},
// 	3
// )
// 	.then((data) => console.log(`Fetch data: ${data}`))
// 	.catch((error) => console.error(`Failed connection: ${error}`));

/**
 * Problem 6. Promise Queue
 * Write a function that runs an array of functions that return Promises, one
 * at a time in sequenece (not parallel)
 */

function delayLog(message, ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(message);
			resolve(message);
		}, ms);
	});
}

const tasks = [
	() => delayLog('Task 1', 1000),
	() => delayLog('Task 2', 500),
	() => delayLog('Task 3', 200),
];

// Output:
// Task 1 (after 1s)
// Task 2 (after 1.5s total)
// Task 3 (after 1.7s total)

async function SequentialRunner(tasks) {
	const results = [];
	for (const task of tasks) {
		const result = await task();
		results.push(result);
	}
	return results;
}

SequentialRunner(tasks).then((response) => {
	console.log(`All tasks done ${response}`);
});
