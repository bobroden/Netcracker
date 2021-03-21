class Stack {

	constructor() {
		this.items = [];
	}

	push(item) {
		if(item !== null && typeof item === 'object') {
			item = JSON.stringify(item);
			Logger.warn('Warn: The element name was converted to a string!');
		}
		else {
			item = String(item);
		}
		this.items.push(item);
		Logger.info('Info: add item with name ' + item);
	}

	pushArr(arr) {
		if(arr.length !== 0 && Array.isArray(arr)) {
			for(let i = 0; i < arr.length; i++) {
				this.items.push(arr[i]);
			}
			Logger.warn('Warn: The array has been added to the stack: ' + arr);
		}
		else
			Logger.error('Error: Empty array or no array!');
	}

	pop() {
		if(this.items.length === 0) {
			Logger.error('Error: The stack is empty!');
			return false;
		}
		Logger.warn('Warn: del item with name ' + this.getElement());
		return this.items.pop();
	}

	isEmpty() {
		return this.items.length === 0;
	}

	print() {
		let str = '';
		for(let i = 0; i < this.items.length; i++)
			str += this.items[i] + ' ';
		if(str.length > 0)
			Logger.info('Info: The stack was withdrawn: ' + str);
		else
			Logger.error('Error: The stack is empty!');
		return str;
	}

	getLength() {
		return this.items.length;
	}

	getElement() {
		if(this.getLength() !== 0) {
			return this.items[this.items.length - 1];
			Logger.info('Info: The top element is: ' + this.items[this.items.length - 1]);
		}
		else
			Logger.error('Error: The stack is empty!');
	}
}