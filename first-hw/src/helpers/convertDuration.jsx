const convertDuration = (num) => {
	const hours = Math.floor(num / 60);
	const minutes = num % 60;
	return hours + ':' + minutes;
};

export default convertDuration;
