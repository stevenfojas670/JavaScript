class CallbackPractice {
	constructor() {}

	// Problem 1
	greeting(name) {
		console.log(`Hello there ${name}!`)
	}

	greetUser(name, callback) {
		callback(name)
	}

	// Problem 2
	displayMessage(msg) {
		console.log(msg)
	}

	delayedMessage(msg, delay, callback) {
		setTimeout(() => callback(msg), delay)
	}

	// Problem 3
	sumArray(arr, callback) {
		let total = 0
		for (let i = 0; i < arr.length; i++) {
			total += arr[i]
		}
		callback(total)
	}

	// Problem 4
	myMap(arr, callback) {
		let newArr = []
		for (let i = 0; i < arr.length; i++) newArr.push(callback(arr[i]))
		return newArr
	}

	// Problem 5
	myFilter(arr, callback) {
		let newArr = []
		for (let i = 0; i < arr.length; i++) {
			if (callback(arr[i])) newArr.push(arr[i])
		}
		return newArr
	}

	// Problem 6
	myForEach(arr, callback) {
		for (let i = 0; i < arr.length; i++) callback(arr[i])
	}

	// Problem 7
	runTasks(tasks, callback) {
		for (let i = 0; i < tasks.length; i++) tasks[i]()
		callback()
	}
}

const practice = new CallbackPractice()

// 1. Greeting with Callback
// Create a function called greetUser(name, calback) that users the callback to print a greeting with the name.

practice.greetUser("Steven", practice.greeting.bind(practice))

// 2. Delayed message
// Write a function delayedMessaged(msg, delay, callback) that waits for a given number of milliseconds, the calls the callback with a the message

practice.delayedMessage(
	"This is my callback calling a callback",
	2000,
	practice.displayMessage
)

// 3. Sum with Callback

practice.sumArray([5, 5, 5, 5], (e) => {
	console.log(`Sum of the array is: ${e}`)
})

// 4. Custom Map Function
// Take an array and perform array manipulation while leaving the original unaffected and returning a new array
const customMap = practice.myMap([5, 10, 15], (e) => {
	return e * 3
})

// console.log(customMap)

// 5. Custom filter
// [].filter(n => n % 2 === 0) will return an array of elements that meet the condition
const customFilter = practice.myFilter([5, 10, 15], (e) => {
	return e > 5
})

// console.log(customFilter)

// 6. Custom forEach
// [].forEach(n => console.log(n * 2)) Takes a callback and runs it for each item but doesn't return anything
practice.myForEach([5, 10, 15], (e) => console.log(e * 100))

/**
 * 7. Run tasks in order
 * Write a function runTasks(tasks, callback) where tasks is an array of functions.
 * Each task logs something. After all are run, call the final callback.
 */

function task1() {
	console.log("Task 1 is running...")
}
function task2() {
	console.log("Task 2 is running...")
}
function task3() {
	console.log("Task 3 is running...")
}

practice.runTasks([task1, task2, task3], () => console.log("All done"))
