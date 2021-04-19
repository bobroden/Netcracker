class TreeNode<T> {
	data: T;
	left: TreeNode<T> | null;
	right: TreeNode<T> | null;

	constructor(data: T) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class BinarySerachTree<T> {
	root: TreeNode<T> | null;
	constructor() {
		this.root = null;
	}

	insert(data: T): void {
		const newNode = new TreeNode<T>(data);
		if (this.root === null) {
			this.root = newNode;
			const tree: HTMLElement | null = document.querySelector(".tree");
			const ul: HTMLElement = document.createElement("ul");
			const li: HTMLElement = document.createElement("li");
			const a: HTMLElement = document.createElement("a");
			a.innerHTML = String(this.root.data);
			a.setAttribute("href", "#");
			li.setAttribute("id", typeof this.root.data + this.root.data);
			li.append(a);
			ul.append(li);
			if (tree) {
				tree.append(ul);
			}
		} else {
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
		if (newNode.data === node.data) {
			return;
		} else if (newNode.data < node.data) {
			if (node.left === null) {
				const li: HTMLElement = document.createElement("li");
				const a: HTMLElement = document.createElement("a");
				a.innerHTML = String(newNode.data) + " <sub>L</sub>";
				a.setAttribute("href", "#");
				li.setAttribute("id", typeof newNode.data + newNode.data);
				li.append(a);

				let ul: HTMLElement | null;
				if (node.left || node.right) {
					ul = document.querySelector("#" + typeof node.data + node.data + " ul");
					if (ul) {
						ul.prepend(li);
					}
				} else {
					ul = document.createElement("ul");
					ul.prepend(li);
					const t: HTMLElement | null = document.getElementById(typeof node.data + node.data);
					if (t) {
						t.append(ul);
					}
				}
				node.left = newNode;

			} else {
				this.insertNode(node.left, newNode);
			}
		} else {
			if (node.right === null) {
				const li: HTMLElement = document.createElement("li");
				const a: HTMLElement = document.createElement("a");
				a.innerHTML = String(newNode.data) + " <sub>R</sub>";
				a.setAttribute("href", "#");
				li.setAttribute("id", typeof newNode.data + newNode.data);
				li.append(a);

				let ul: HTMLElement | null;
				if (node.left || node.right) {
					ul = document.querySelector("#" + typeof node.data + node.data + " ul");
					if (ul) {
						ul.append(li);
					}
				} else {
					ul = document.createElement("ul");
					ul.prepend(li);
					const t: HTMLElement | null = document.getElementById(typeof node.data + node.data);
					if (t) {
						t.append(ul);
					}
				}
				node.right = newNode;
			} else {
				this.insertNode(node.right, newNode);
			}
		}
	}

	search(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
		if (node === null) {
			return null;
		} else if (data < node.data) {
			return this.search(node.left, data);
		} else if (data > node.data) {
			return this.search(node.right, data);
		} else {
			const searched = document.querySelector("#" + typeof node.data + node.data + " a");
			if (searched) {
				searched.classList.add("searched");
				setTimeout(function(): void {
					if (searched) {
						searched.classList.remove("searched");
					}
				}, 3000);
			}
			return node;
		}
	}

	findMinNode(node: TreeNode<T> | null): TreeNode<T> | null {
		if (node) {
			if (node.left === null) {
				return node;
			} else {
				return this.findMinNode(node.left);
			}
		}
		return null;
	}

	remove(data: T): void {
		this.root = this.removeNode(this.root, data);
	}

	removeNode(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
		if (node === null) {
			return null;
		} else if (data < node.data) {
			node.left = this.removeNode(node.left, data);
			return node;
		} else if (data > node.data) {
			node.right = this.removeNode(node.right, data);
			return node;
		} else {
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}

			const newNode = this.findMinNode(node.right);
			if (newNode) {
				node.data = newNode.data;
				node.right = this.removeNode(node.right, newNode.data);
			}
			return node;
		}
	}

	preOrderTravarse(node: TreeNode<T> | null): void {
		if (node != null) {
			console.log(node.data);
			const searched = document.querySelector("#" + typeof node.data + node.data + " a");
			if (searched) {
				searched.classList.add("searched");
				setTimeout(function(): void {
					if (searched) {
						searched.classList.remove("searched");
					}
				}, 3000);
			}
			this.preOrderTravarse(node.left);
			this.preOrderTravarse(node.right);
		}
	}

	Redraw(node: TreeNode<T>): void {
		if (this.root && this.root.data === node.data) {
			const tree: HTMLElement | null = document.querySelector(".tree");
			const ul: HTMLElement = document.createElement("ul");
			const li: HTMLElement = document.createElement("li");
			const a: HTMLElement = document.createElement("a");
			a.innerHTML = String(this.root.data);
			a.setAttribute("href", "#");
			li.setAttribute("id", typeof this.root.data + this.root.data);
			li.append(a);
			ul.append(li);
			if (tree) {
				tree.append(ul);
			}
		}
		if (node.left !== null) {
			const li: HTMLElement = document.createElement("li");
			const a: HTMLElement = document.createElement("a");
			a.innerHTML = String(node.left.data) + " <sub>L</sub>";
			a.setAttribute("href", "#");
			li.setAttribute("id", typeof node.left.data + node.left.data);
			li.append(a);

			let ul: HTMLElement | null;
			ul = document.querySelector("#" + typeof node.data + node.data + " ul");
			if (ul && ul.children.length > 0) {
				ul = document.querySelector("#" + typeof node.data + node.data + " ul");
				if (ul) {
					ul.prepend(li);
				}
			} else {
				ul = document.createElement("ul");
				ul.prepend(li);
				const t: HTMLElement | null = document.getElementById(typeof node.data + node.data);
				if (t) {
					t.append(ul);
				}
			}
			this.Redraw(node.left);
		}
		if (node.right !== null) {
			const li: HTMLElement = document.createElement("li");
			const a: HTMLElement = document.createElement("a");
			a.innerHTML = String(node.right.data) + " <sub>R</sub>";
			a.setAttribute("href", "#");
			li.setAttribute("id", typeof node.right.data + node.right.data);
			li.append(a);

			let ul: HTMLElement | null;
			ul = document.querySelector("#" + typeof node.data + node.data + " ul");
			if (ul && ul.children.length > 0) {
				ul = document.querySelector("#" + typeof node.data + node.data + " ul");
				if (ul) {
					ul.append(li);
				}
			} else {
				ul = document.createElement("ul");
				ul.prepend(li);
				const t: HTMLElement | null = document.getElementById(typeof node.data + node.data);
				if (t) {
					t.append(ul);
				}
			}
			this.Redraw(node.right);
		}
	}
}
