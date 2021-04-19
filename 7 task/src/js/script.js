"use strict";
exports.__esModule = true;
var binary_tree_1 = require("../ts/binary-tree.ts");
require("../scss/style.scss");
var tree = new binary_tree_1.BinarySerachTree();
var container = document.querySelector(".tree");
var textArea = document.querySelector(".notif");
var add_button = document.querySelector(".add-button");
var add_input = document.querySelector(".add");
var search_button = document.querySelector(".search-button");
var search_input = document.querySelector(".search");
var delete_button = document.querySelector(".delete-button");
var delete_input = document.querySelector(".delete");
var bypass_button = document.querySelector(".bypass-button");
var console_button = document.querySelector(".console-button");
var console_input = document.querySelector(".console");
function scrollToLast(elem) {
    elem.scrollTop = elem.scrollHeight;
}
function checkTypeOfRoot() {
    if (tree.root === null) {
        return null;
    }
    return typeof tree.root.data;
}
if (add_button) {
    add_button.addEventListener("click", function () {
        if (add_input && add_input.value && textArea) {
            var val = +add_input.value;
            var check = checkTypeOfRoot();
            if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
                tree.insert(add_input.value);
            }
            else if (!isNaN(val) && check !== "string") {
                tree.insert(+add_input.value);
            }
            else {
                alert("Typeof of root is another!");
                return;
            }
            textArea.value += "Added: " + add_input.value + ";\n";
            scrollToLast(textArea);
        }
    });
}
if (search_button) {
    search_button.addEventListener("click", function () {
        if (search_input && search_input.value && textArea) {
            var val = +search_input.value;
            var check = checkTypeOfRoot();
            if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
                tree.search(tree.root, search_input.value);
            }
            else if (!isNaN(val) && check !== "string") {
                tree.search(tree.root, +search_input.value);
            }
            textArea.value += "Try to search: " + search_input.value + ";\n";
            scrollToLast(textArea);
        }
    });
}
if (delete_button) {
    delete_button.addEventListener("click", function () {
        if (delete_input && delete_input.value && textArea) {
            var val = +delete_input.value;
            var check = checkTypeOfRoot();
            if ((isNaN(val) && check !== "number") || (!isNaN(val) && check === "string")) {
                tree.removeNode(tree.root, delete_input.value);
            }
            else if (!isNaN(val) && check !== "string") {
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
    bypass_button.addEventListener("click", function () {
        if (textArea) {
            tree.preOrderTravarse(tree.root);
            textArea.value += "All nodes: ";
            for (var i = 0; i < document.querySelectorAll("a").length; i++) {
                textArea.value += document.querySelectorAll("a")[i].innerText + "; ";
            }
            textArea.value += "\n";
            scrollToLast(textArea);
        }
    });
}
if (console_button) {
    console_button.addEventListener("click", function () {
        var consol = "";
        if (console_input) {
            consol = console_input.value;
        }
        if (consol === "Bypass()" && textArea) {
            tree.preOrderTravarse(tree.root);
            textArea.value += "All nodes: ";
            for (var i = 0; i < document.querySelectorAll("a").length; i++) {
                textArea.value += document.querySelectorAll("a")[i].innerText + "; ";
            }
            textArea.value += "\n";
            scrollToLast(textArea);
        }
        else if (textArea) {
            var arr = consol.split("(");
            if (arr.length === 2 && arr[1][arr[1].length - 1] === ")") {
                arr[1] = arr[1].substring(0, arr[1].length - 1);
                var buf = "";
                var check = checkTypeOfRoot();
                if (!isNaN(+arr[1]) && check !== "string") {
                    buf = +arr[1];
                }
                else if ((isNaN(+arr[1]) && check !== "number") || (!isNaN(+arr[1]) && check === "string")) {
                    buf = arr[1];
                }
                if (arr[0] === "Add" && buf !== "") {
                    tree.insert(buf);
                    textArea.value += "Added: " + buf + ";\n";
                }
                else if (arr[0] === "Delete" && buf !== "") {
                    tree.removeNode(tree.root, buf);
                    textArea.value += "Deleted: " + buf + ";\n";
                    if (container && tree.root) {
                        container.innerHTML = "";
                        tree.Redraw(tree.root);
                    }
                }
                else if (arr[0] === "Search" && buf !== "") {
                    tree.search(tree.root, buf);
                    textArea.value += "Try to search: " + buf + ";\n";
                }
                else {
                    alert("Typeof of root is another!");
                }
                scrollToLast(textArea);
            }
            else {
                alert("Check console input!");
            }
        }
    });
}
