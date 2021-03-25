class Stack {

	constructor() {
		this.items = [];
	}

	push(item) {
		this.items.push(JSON.stringify(item));
		Logger.info('Info: add item with name ' + item);
	}

	pushArr(arr) {
		try {
			if(arr.length !== 0 && Array.isArray(arr)) {
				for(let i = 0; i < arr.length; i++) {
					this.items.push(arr[i]);
				}
				Logger.warn('Warn: The array has been added to the stack: ' + arr);
			}
			else
				throw new Error('Empty array or no array!')
		}
		catch(e) {
			Logger.error('Error: ' + e.message);
		}
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
		try {
			if(this.items.length === 0)
				throw new Error("The stack is empty!");
			else {
				let str = '';
				for(let i = 0; i < this.items.length; i++)
					str += this.items[i] + ' ';
				Logger.info('Info: The stack was withdrawn: ' + str);
				return str;
			}
		}
		catch(e) {
			Logger.error('Error: ' + e.message);
		}
	}

	getLength() {
		return this.items.length;
	}

	getElement() {
		try {
			if(this.getLength() == 0)
				throw new Error("The stack is empty!");
			else {
				Logger.info('Info: The top element is: ' + this.items[this.items.length - 1]);
				return this.items[this.items.length - 1];
			}
		}
		catch(e) {
			Logger.error('Error: ' + e.message);
		}
	}
}