let stack_A = new Stack();
let stack_B = new Stack();

const length_visible_stack = 2;

if(localStorage.getItem('stack_A')) {
	stack_A.pushArr(localStorage.getItem('stack_A').split(','));
}

if(localStorage.getItem('stack_B')) {
	stack_B.pushArr(localStorage.getItem('stack_B').split(','));
}

function checkModalWindow() {
	if(document.querySelector('#modal-check').checked) {
		document.querySelector('.modal-window').classList.remove('hidden');
		setTimeout(function() {
		  	document.querySelector('.modal-window').classList.add('hidden');
		}, 5000);
	}
	else {
		document.querySelector('.modal-window').classList.add('hidden');
	}
}

function createItemElement(name) {
	let div = document.createElement('div');
	div.classList.add('storage__item');
	let h2 = `<h2 class="storage__item__title">${name}</h2>`;
	div.innerHTML = h2;
	return div;
}

function createElements() {
	if(!stack_A.isEmpty()) {
		for(let i = 0; i < stack_A.getLength(); i++) {
			let div = createItemElement(stack_A.items[i]);
			if(i < stack_A.getLength() - (length_visible_stack + 1)) 
				div.classList.add('invisible');
			document.querySelector('.storage-left').append(div);
		}
	}
	if(!stack_B.isEmpty()) {
		for(let i = 0; i < stack_B.getLength(); i++) {
			let div = createItemElement(stack_B.items[i]);
			if(i < stack_B.getLength() - (length_visible_stack + 1)) 
				div.classList.add('invisible');
			document.querySelector('.storage-right').prepend(div);
		}
	}
	if(localStorage.getItem('check-modal-window') === 'true') {
		document.querySelector('#modal-check').checked = true;
	}
	else
		document.querySelector('#modal-check').checked = false;
	checkModalWindow();
}

createElements();

document.querySelector('.left-del').addEventListener('click', () => {
	stack_A.pop();
	if(document.querySelectorAll('.storage-left .storage__item').length !== 0)
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 1].remove();
	if(stack_A.getLength() > length_visible_stack) {
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - (length_visible_stack + 1)].classList.remove('invisible');
	}
	if(localStorage.getItem('stack_A')) {
		let arr = localStorage.getItem('stack_A').split(',');
		arr.pop();
		localStorage.setItem('stack_A', arr.join(','));
	}
	checkModalWindow();
})

document.querySelector('.right-del').addEventListener('click', () => {
	stack_B.pop();
	if(document.querySelectorAll('.storage-right .storage__item').length !== 0) {
		document.querySelectorAll('.storage-right .storage__item')[0].remove();
	}
	if(stack_B.getLength() === 0)
		document.querySelector('.storage-right').innerHTML = '';
	if(stack_B.getLength() > length_visible_stack) {
		document.querySelectorAll('.storage-right .storage__item')[length_visible_stack].classList.remove('invisible');
	}
	if(localStorage.getItem('stack_B')) {
		let arr = localStorage.getItem('stack_B').split(',');
		arr.pop();
		localStorage.setItem('stack_B', arr.join(','));
	}
	checkModalWindow();
})

document.querySelector('.left-move').addEventListener('click', () => {
	let s = stack_A.pop();
	if(s) {
		stack_B.push(s);
		document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - 1].remove();
		let div = createItemElement(s);
		document.querySelector('.storage-right').prepend(div);
		if(document.querySelectorAll('.storage-left .storage__item').length > length_visible_stack)
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - (length_visible_stack + 1)].classList.remove('invisible');
		if(stack_B.getLength() > (length_visible_stack + 1)) {
			document.querySelectorAll('.storage-right .storage__item')[(length_visible_stack + 1)].classList.add('invisible');
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
	checkModalWindow();
})

document.querySelector('.right-move').addEventListener('click', () => {
	let s = stack_B.pop();
	if(s) {
		stack_A.push(s);
		document.querySelectorAll('.storage-right .storage__item')[0].remove();
		let div = createItemElement(s);
		document.querySelector('.storage-left').append(div);
		if(document.querySelectorAll('.storage-right .storage__item').length > length_visible_stack)
			document.querySelectorAll('.storage-right .storage__item')[length_visible_stack].classList.remove('invisible');
		else if(document.querySelectorAll('.storage-right .storage__item').length !== 0) {
			document.querySelectorAll('.storage-right .storage__item')[document.querySelectorAll('.storage-right .storage__item').length - 1].classList.remove('invisible');
		}
		else {
			document.querySelector('.storage-right').innerHTML = '';
		}
		if(stack_A.getLength() > (length_visible_stack + 1)) {
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - (length_visible_stack + 2)].classList.add('invisible');
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
	checkModalWindow();
})

document.querySelector('.left-add').addEventListener('click', () => {
	let s = document.querySelector('.left-name').value.trim();
	if(s === '')
		alert("You can't add an empty string!");
	else {
		stack_A.push(s);
		let div = createItemElement(s);
		document.querySelector('.storage-left').append(div);
		if(stack_A.getLength() > (length_visible_stack + 1)) {
			document.querySelectorAll('.storage-left .storage__item')[document.querySelectorAll('.storage-left .storage__item').length - (length_visible_stack + 2)].classList.add('invisible');
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
	checkModalWindow();
})

document.querySelector('.right-add').addEventListener('click', () => {
	let s = document.querySelector('.right-name').value.trim();
	if(s === '')
		alert("You can't add an empty string!");
	else {
		stack_B.push(s);
		let div = createItemElement(s);
		document.querySelector('.storage-right').prepend(div);
		if(stack_B.getLength() > (length_visible_stack + 1)) {
			document.querySelectorAll('.storage-right .storage__item')[(length_visible_stack + 1)].classList.add('invisible');
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
	checkModalWindow();
})

document.querySelector('#modal-check').addEventListener('click', () => {
	if(!document.querySelector('#modal-check').checked) {
		document.querySelector('.modal-window').classList.add('hidden');
		localStorage.setItem('check-modal-window', false);
	}
	else {
		document.querySelector('.modal-window').classList.remove('hidden');
		setTimeout(function() {
		  	document.querySelector('.modal-window').classList.add('hidden');
		}, 5000);
		localStorage.setItem('check-modal-window', true);
	}
})

document.querySelector('.modal-window__close-button').addEventListener('click', () => {
	document.querySelector('.modal-window').classList.add('hidden');
})