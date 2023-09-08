"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var binarySearchTree_js_1 = require("./binarySearchTree.js");
function randomNumber(min, max) {
    return Math.random() * max - min;
}
function randomNumberArr(min, max, len, acc) {
    if (acc === void 0) { acc = []; }
    if (acc.length === len)
        return acc;
    else
        return randomNumberArr(min, max, len, __spreadArray(__spreadArray([], acc, true), [randomNumber(min, max)], false));
}
var driver = (function () {
    var arr = randomNumberArr(0, 100, 20);
    var tree = new binarySearchTree_js_1.Tree(arr);
    if (!tree.isBalanced()) {
        console.log("Error: Initial tree not balanced");
        return;
    }
    console.log(tree.levelOrder());
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
    for (var i = 0; i < 10; i++) {
        tree.insert(randomNumber(100, 200));
    }
    if (tree.isBalanced()) {
        console.log("Error: post-insert tree balanced");
        return;
    }
    tree.rebalance();
    if (!tree.isBalanced()) {
        console.log("Error: Rebalanced tree not balanced");
        return;
    }
    console.log(tree.levelOrder());
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
})();
