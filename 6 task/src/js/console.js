export function getCurrentDate() {
	let dateObj = new Date;
	let date = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear() + ', ';
	let time = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds() + '   ';
	return date + time;
}

export let Logger = {

	log: function(text) {
		console.log(text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	info: function(text) {
		console.info(text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	warn: function(text) {
		console.warn(text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	error: function(text) {
		console.error(text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},

}