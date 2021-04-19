import { BinarySerachTree } from "./binary-tree";

const tree = new BinarySerachTree();

const container: HTMLElement | null = document.querySelector(".tree");

const textArea: HTMLInputElement | null = document.querySelector(".notif");

const add_button: HTMLElement | null = document.querySelector(".add-button");
const add_input: HTMLInputElement | null = document.querySelector(".add");

const search_button: HTMLElement | null = document.querySelector(".search-button");
const search_input: HTMLInputElement | null = document.querySelector(".search");

const delete_button: HTMLElement | null = document.querySelector(".delete-button");
const delete_input: HTMLInputElement | null = document.querySelector(".delete");

const bypass_button: HTMLElement | null = document.querySelector(".bypass-button");

const console_button: HTMLElement | null = document.querySelector(".console-button");
const console_input: HTMLInputElement | null = document.querySelector(".console");


function scrollToLast(elem: HTMLElement): void {
	elem.scrollTop = elem.scrollHeight;
}

function checkTypeOfRoot(): String | null {
	if (tree.root === null) {
		return null;
	}
	return typeof tree.root.data;
}

if (add_button) {
	add_button.addEventListener("click", () => {
		if (add_input && add_input.value && textArea) {
			const val = +add_input.value;
			const check: String | null = checkTypeOfRoot();
			if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
				tree.insert(add_input.value);
			} else if (!isNaN(val) && check !== "string") {
				tree.insert(+add_input.value);
			} else {
				alert("Typeof of root is another!");
				return;
			}
			textArea.value += "Added: " + add_input.value + ";\n";
			scrollToLast(textArea);
		}
	});
}

if (search_button) {
	search_button.addEventListener("click", () => {
		if (search_input && search_input.value && textArea) {
			const val = +search_input.value;
			const check: String | null = checkTypeOfRoot();
			if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
				tree.search(tree.root, search_input.value);
			} else if (!isNaN(val) && check !== "string") {
				tree.search(tree.root, +search_input.value);
			}
			textArea.value += "Try to search: " + search_input.value + ";\n";
			scrollToLast(textArea);
		}
	});
}

if (delete_button) {
	delete_button.addEventListener("click", () => {
		if (delete_input && delete_input.value && textArea) {
			const val = +delete_input.value;
			const check: String | null = checkTypeOfRoot();
			if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
				tree.removeNode(tree.root, delete_input.value);
			} else if (!isNaN(val) && check !== "string") {
				tree.removeNode(tree.root, +delete_input.value);
			}
			textArea.value += "Try to delete: " + delete_input.value + ";\n";
			scrollToLast(textArea);
			if (tree.root && container) {
				container.innerHTML = "";
				tree.Redraw(tree.root);
			}
		}
	});
}

if (bypass_button) {
	bypass_button.addEventListener("click", () => {
		if (textArea) {
			tree.preOrderTravarse(tree.root);
			textArea.value += "All nodes: ";
			for (let i = 0; i < document.querySelectorAll("a").length; i++) {
				textArea.value += document.querySelectorAll("a")[i].innerText + "; ";
			}
			textArea.value += "\n";
			scrollToLast(textArea);
		}
	});
}

if (console_button) {
	console_button.addEventListener("click", () => {
		let consol: String = "";
		if (console_input) {
			consol = console_input.value;
		}
		if (consol === "Bypass()" && textArea) {
			tree.preOrderTravarse(tree.root);
			textArea.value += "All nodes: ";
			for (let i = 0; i < document.querySelectorAll("a").length; i++) {
				textArea.value += document.querySelectorAll("a")[i].innerText + "; ";
			}
			textArea.value += "\n";
			scrollToLast(textArea);
		} else if (textArea) {
			const arr = consol.split("(");
			if (arr.length === 2 && arr[1][arr[1].length - 1] === ")") {
				arr[1] = arr[1].substring(0, arr[1].length - 1);
				let buf: String | Number = "";
				const check: String | null = checkTypeOfRoot();
				if (!isNaN(+arr[1]) && check !== "string") {
					buf = +arr[1];
				} else if ((isNaN(+arr[1]) && check !== "number") || (!isNaN(+arr[1]) && check === "string")) {
					buf = arr[1];
				}
				if (arr[0] === "Add" && buf !== "") {
					tree.insert(buf);
					textArea.value += "Added: " + buf + ";\n";
				} else if (arr[0] === "Delete" && buf !== "") {
					tree.removeNode(tree.root, buf);
					textArea.value += "Deleted: " + buf + ";\n";
					if (container && tree.root) {
						container.innerHTML = "";
						tree.Redraw(tree.root);
					}
				} else if (arr[0] === "Search" && buf !== "") {
					tree.search(tree.root, buf);
					textArea.value += "Try to search: " + buf + ";\n";
				} else {
					alert("Typeof of root is another!");
				}
				scrollToLast(textArea);
			} else {
				alert("Check console input!");
			}
		}
	});
}
