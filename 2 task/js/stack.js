class Stack {

	constructor() {
		this.items = [];
	}

	push(item) {
		this.items.push(item);
	}

	pushArr(arr) {
		if(arr.length !== 0) {
			for(let i = 0; i < arr.length; i++) {
				this.items.push(arr[i]);
			}
		}
	}

	pop() {
		if(this.items.length === 0)
			return false;
		return this.items.pop();
	}

	isEmpty() {
		return this.items.length === 0;
	}

	print() {
		let str = '';
		for(let i = 0; i < this.items.length; i++)
			str += this.items[i] + ' ';
		return str;
	}

	getLength() {
		return this.items.length;
	}

	getElement() {
		return this.items[this.items.length - 1];
	}
}