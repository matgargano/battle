const promiseTimeout = (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const getRandom = (max) => {
	return Math.floor(Math.random() * max);
};

export { promiseTimeout, getRandom };
