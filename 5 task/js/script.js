function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function checkNesting(parent) {
	let obj;
	if(document.querySelector(parent))
		obj = document.querySelector(parent);
	else
		obj = document.getElementByTagName(container);
	let count = 0;
	while(obj.tagName != 'BODY') {
		obj = obj.parentNode;
		count++;
	}
	if(count < 5)
		return true;
	return false;
}

function makeBlockOld(container, item, quantity) {
	if((document.querySelector(container) || document.getElementByTagName(container)) && quantity > 0 && checkNesting(container)) {
		for(let i = 0; i < quantity; i++) {
			let newItem = document.createElement(item);
			newItem.classList.add('item');
			let img = document.createElement('img');
			img.setAttribute('src', 'img/close.svg');
			img.setAttribute('alt', 'close');
			img.setAttribute('title', 'close');
			img.classList.add('item__close');
			newItem.append(img);
			newItem.innerHTML += i;
			if(document.querySelector(container))
				document.querySelector(container).append(newItem);
			else
				document.getElementByTagName(container).append(newItem);
		}
	}
	else
		alert('The number is less than or equal to 0. Or there is no container for the specified selector! Or nesting is bigger than 5!');
}

let makeBlock = curry(makeBlockOld);

document.querySelector('body').addEventListener('click', e => {
	if (e.target.classList.contains('item__close')) {
    	let i = Array.from(document.querySelectorAll('.item__close')).indexOf(e.target);
    	document.querySelectorAll('.item')[i].remove();
	}
})

document.querySelector('.button-container__button').addEventListener('click', () => {
	let inputs = document.querySelectorAll('.container__input');
	try {
		if(inputs[0].value.trim() !== '' && inputs[1].value.trim() !== '' && inputs[2].value.trim() !== '')
			makeBlock(inputs[0].value)(inputs[1].value)(+inputs[2].value);
	}
	catch {
		alert('Check if everything is written correctly in inputs! Or there is no such container!');
	}	
})