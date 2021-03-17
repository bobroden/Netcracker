let stack_A = new Stack();
let stack_B = new Stack();

if(localStorage.getItem('stack_A')) {
	stack_A.pushArr(localStorage.getItem('stack_A').split(','));
}

if(localStorage.getItem('stack_B')) {
	stack_B.pushArr(localStorage.getItem('stack_B').split(','));
}

function createElements() {
	if(!stack_A.isEmpty()) {
		for(let i = 0; i < stack_A.getLength(); i++) {
			let div = document.createElement('div');
			div.classList.add('storage__item');
			let h2 = `<h2 class="storage__item__title">${stack_A.items[i]}</h2>`;
			div.innerHTML = h2;
			if(i < stack_A.getLength() - 3) 
				div.classList.add('invisible');
			document.querySelector('.storage-left').append(div);
		}
	}
	if(!stack_B.isEmpty()) {
		for(let i = 0; i < stack_B.getLength(); i++) {
			let div = document.createElement('div');
			div.classList.add('storage__item');
			let h2 = `<h2 class="storage__item__title">${stack_B.items[i]}</h2>`;
			div.innerHTML = h2;
			if(i < stack_B.getLength() - 3) 
				div.classList.add('invisible');
			document.querySelector('.storage-right').prepend(div);
		}
	}
}

createElements();

document.querySelector('.left-del').addEventListener('click', () => {
	stack_A.pop();
	if(document.querySelectorAll('.storage-left .storage__item').length !== 0)
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 1].remove();
	if(stack_A.getLength() > 2) {
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 3].classList.remove('invisible');
	}
	if(localStorage.getItem('stack_A')) {
		let arr = localStorage.getItem('stack_A').split(',');
		arr.pop();
		localStorage.setItem('stack_A', arr.join(','));
	}
})

document.querySelector('.right-del').addEventListener('click', () => {
	stack_B.pop();
	if(document.querySelectorAll('.storage-right .storage__item').length !== 0) {
		document.querySelectorAll('.storage-right .storage__item')[0].remove();
	}
	if(stack_B.getLength() === 0)
		document.querySelector('.storage-right').innerHTML = '';
	if(stack_B.getLength() > 2) {
		document.querySelectorAll('.storage-right .storage__item')[2].classList.remove('invisible');
	}
	if(localStorage.getItem('stack_B')) {
		let arr = localStorage.getItem('stack_B').split(',');
		arr.pop();
		localStorage.setItem('stack_B', arr.join(','));
	}
})

document.querySelector('.left-move').addEventListener('click', () => {
	let s = stack_A.pop();
	if(s) {
		stack_B.push(s);
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 1].remove();
		let div = document.createElement('div');
		div.classList.add('storage__item');
		let h2 = `<h2 class="storage__item__title">${s}</h2>`;
		div.innerHTML = h2;
		document.querySelector('.storage-right').prepend(div);
		if(document.querySelectorAll('.storage-left .storage__item').length > 2)
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 3].classList.remove('invisible');
		if(stack_B.getLength() > 3) {
			document.querySelectorAll('.storage-right .storage__item')[3].classList.add('invisible');
		}
		if(localStorage.getItem('stack_A')) {
			let arr = localStorage.getItem('stack_A').split(',');
			arr.pop();
			localStorage.setItem('stack_A', arr.join(','));
		}
		if(localStorage.getItem('stack_B')) {
			let arr = localStorage.getItem('stack_B').split(',');
			arr.push(s);
			localStorage.setItem('stack_B', arr.join(','));
		}
		else
			localStorage.setItem('stack_B', s);
	}
})

document.querySelector('.right-move').addEventListener('click', () => {
	let s = stack_B.pop();
	if(s) {
		stack_A.push(s);
		document.querySelectorAll('.storage-right .storage__item')[0].remove();
		let div = document.createElement('div');
		div.classList.add('storage__item');
		let h2 = `<h2 class="storage__item__title">${s}</h2>`;
		div.innerHTML = h2;
		document.querySelector('.storage-left').append(div);
		if(document.querySelectorAll('.storage-right .storage__item').length > 2)
			document.querySelectorAll('.storage-right .storage__item')[2].classList.remove('invisible');
		else if(document.querySelectorAll('.storage-right .storage__item').length !== 0) {
			document.querySelectorAll('.storage-right .storage__item')[document.querySelectorAll('.storage-right .storage__item').length - 1].classList.remove('invisible');
		}
		else {
			document.querySelector('.storage-right').innerHTML = '';
		}
		if(stack_A.getLength() > 3) {
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 4].classList.add('invisible');
		}
		if(localStorage.getItem('stack_B')) {
			let arr = localStorage.getItem('stack_B').split(',');
			arr.pop();
			localStorage.setItem('stack_B', arr.join(','));
		}
		if(localStorage.getItem('stack_A')) {
			let arr = localStorage.getItem('stack_A').split(',');
			arr.push(s);
			localStorage.setItem('stack_A', arr.join(','));
		}
		else
			localStorage.setItem('stack_A', s);
	}
})

document.querySelector('.left-add').addEventListener('click', () => {
	let s = document.querySelector('.left-name').value.trim();
	if(s === '')
		alert("You can't add an empty string!");
	else {
		stack_A.push(s);
		let div = document.createElement('div');
		div.classList.add('storage__item');
		let h2 = `<h2 class="storage__item__title">${s}</h2>`;
		div.innerHTML = h2;
		document.querySelector('.storage-left').append(div);
		if(stack_A.getLength() > 3) {
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 4].classList.add('invisible');
		}
		if(localStorage.getItem('stack_A')) {
			let arr = localStorage.getItem('stack_A').split(',');
			arr.push(s);
			localStorage.setItem('stack_A', arr.join(','));
		}
		else
			localStorage.setItem('stack_A', s);
		document.querySelector('.left-name').value = '';
	}
})

document.querySelector('.right-add').addEventListener('click', () => {
	let s = document.querySelector('.right-name').value.trim();
	if(s === '')
		alert("You can't add an empty string!");
	else {
		stack_B.push(s);
		let div = document.createElement('div');
		div.classList.add('storage__item');
		let h2 = `<h2 class="storage__item__title">${s}</h2>`;
		div.innerHTML = h2;
		document.querySelector('.storage-right').prepend(div);
		if(stack_B.getLength() > 3) {
			document.querySelectorAll('.storage-right .storage__item')[3].classList.add('invisible');
		}
		if(localStorage.getItem('stack_B')) {
			let arr = localStorage.getItem('stack_B').split(',');
			arr.push(s);
			localStorage.setItem('stack_B', arr.join(','));
		}
		else
			localStorage.setItem('stack_B', s);
		document.querySelector('.right-name').value = '';
	}
})