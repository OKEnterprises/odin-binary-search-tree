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
exports.Tree = void 0;
var TreeNode = /** @class */ (function () {
    function TreeNode(val) {
        this.value = val;
    }
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree(arr) {
        this.root = this.sortedArrayToBST(arr, 0, arr.length);
    }
    Tree.prototype.sortedArrayToBST = function (arr, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = arr.length - 1; }
        if (start > end)
            return null;
        var mid = Math.floor((start - end) / 2);
        var node = new TreeNode(arr[mid]);
        node.left = this.sortedArrayToBST(arr, start, mid);
        node.right = this.sortedArrayToBST(arr, mid, end);
        return node;
    };
    Tree.prototype.find = function (value) {
        var curr = this.root;
        while (curr) {
            if (value === curr.value) {
                return curr;
            }
            else if (value > curr.value) {
                curr = curr.left;
            }
            else {
                curr = curr.right;
            }
        }
        return null;
    };
    Tree.prototype.insert = function (value) {
        var node = new TreeNode(value);
        if (!this.root) {
            this.root = node;
            return;
        }
        var curr = this.root;
        while (curr) {
            if (value < curr.value && !curr.left) {
                curr.left = node;
                return;
            }
            else if (value < curr.value) {
                curr = curr.left;
            }
            else if (value > curr.value && !curr.right) {
                curr.right = node;
                return;
            }
            else if (value > curr.value) {
                curr = curr.right;
            }
        }
    };
    Tree.prototype.deleteRec = function (root, value) {
        if (!root)
            return root;
        if (root.value > value) {
            root.left = this.deleteRec(root.left, value);
        }
        else if (root.value < value) {
            root.right = this.deleteRec(root.right, value);
        }
        if (root.left === null) {
            var temp = root.right;
            root = null;
            return temp;
        }
        else if (root.right === null) {
            var temp = root.left;
            root = null;
            return temp;
        }
        else {
            var succParent = root;
            var succ = root.right;
            while (succ.left) {
                succParent = succ;
                succ = succ.left;
            }
            if (succParent !== root) {
                succParent.left = succ.right;
            }
            else {
                succParent.right = succ.right;
            }
            root.value = succ.value;
            succ = null;
            return root;
        }
    };
    Tree.prototype.delete = function (value) {
        this.root = this.deleteRec(this.root, value);
        return this.root;
    };
    Tree.prototype.levelOrder = function (queue, acc, fn) {
        if (queue === void 0) { queue = [this.root]; }
        if (acc === void 0) { acc = []; }
        if (fn === void 0) { fn = (function (x) { return x; }); }
        if (queue.length < 1)
            return acc;
        var nextQueue = [];
        var nextAcc = __spreadArray([], acc, true);
        queue.forEach(function (item) {
            if (!item)
                return;
            if (item.left)
                nextQueue.push(item.left);
            if (item.right)
                nextQueue.push(item.right);
            nextAcc.push(fn(item.value));
        });
        return this.levelOrder(nextQueue, nextAcc, fn);
    };
    Tree.prototype.inOrder = function (root, acc, fn) {
        if (root === void 0) { root = this.root; }
        if (acc === void 0) { acc = []; }
        if (fn === void 0) { fn = (function (x) { return x; }); }
        if (!root)
            return null;
        if (root.left)
            this.inOrder(root.left, acc, fn);
        acc.push(fn(root.value));
        if (root.right)
            this.inOrder(root.right, acc, fn);
        return acc;
    };
    Tree.prototype.preOrder = function (root, acc, fn) {
        if (root === void 0) { root = this.root; }
        if (acc === void 0) { acc = []; }
        if (fn === void 0) { fn = (function (x) { return x; }); }
        if (!root)
            return null;
        acc.push(fn(root.value));
        if (root.left)
            this.preOrder(root.left, acc, fn);
        if (root.right)
            this.preOrder(root.right, acc, fn);
        return acc;
    };
    Tree.prototype.postOrder = function (root, acc, fn) {
        if (root === void 0) { root = this.root; }
        if (acc === void 0) { acc = []; }
        if (fn === void 0) { fn = (function (x) { return x; }); }
        if (!root)
            return null;
        if (root.left)
            this.postOrder(root.left, acc, fn);
        if (root.right)
            this.postOrder(root.right, acc, fn);
        acc.push(fn(root.value));
        return acc;
    };
    Tree.prototype.height = function (root) {
        if (root === void 0) { root = this.root; }
        if (!root)
            return -1;
        else if (!root.left && !root.right)
            return 1;
        else if (!root.left && root.right)
            return this.height(root.right);
        else if (!root.right && root.left)
            return this.height(root.left);
        else
            return Math.max(this.height(root.left), this.height(root.right)) + 1;
    };
    Tree.prototype.depth = function (node, root) {
        if (root === void 0) { root = this.root; }
        if (!node || !root)
            return -1;
        else if (node.value === root.value)
            return 0;
        else if (!root.left || node.value > root.value)
            return 1 + this.depth(node, root.right);
        else if (!root.right || node.value < root.value)
            return 1 + this.depth(node, root.left);
        else
            return -1;
    };
    Tree.prototype.isBalanced = function (root) {
        if (root === void 0) { root = this.root; }
        if (!root)
            return false;
        else if (!root.left && this.height(root.right) <= 1)
            return true;
        else if (!root.right && this.height(root.left) <= 1)
            return true;
        else if (!root.left || !root.right)
            return false;
        var smallHeightDifference = Math.abs(this.height(root.left) - this.height(root.right)) <= 1;
        return smallHeightDifference && this.isBalanced(root.left) && this.isBalanced(root.right);
    };
    Tree.prototype.rebalance = function (root) {
        if (root === void 0) { root = this.root; }
        var arr = this.levelOrder([root], []);
        arr.sort(function (a, b) { return a - b; });
        this.root = this.sortedArrayToBST(arr);
        return this.root;
    };
    return Tree;
}());
exports.Tree = Tree;
