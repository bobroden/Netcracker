function getCurrentDate() {
	let dateObj = new Date;
	let date = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear() + ', ';
	let time = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds() + '   ';
	return date + time;
}

let Logger = {

	logOld: console.log,
	errOld: console.error,
	warnOld: console.warn,
	infoOld: console.info,

	log: function(text) {
		this.logOld.call(console, getCurrentDate() + text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	info: function(text) {
		this.infoOld.call(console, getCurrentDate() + text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	warn: function(text) {
		this.warnOld.call(console, getCurrentDate() + text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	error: function(text) {
		this.errOld.call(console, getCurrentDate() + text);
		document.querySelector('.modal-window__information').innerHTML = text;
	},
	
}