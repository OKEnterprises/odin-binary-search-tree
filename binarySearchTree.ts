import { ro } from "date-fns/locale";

class TreeNode<E> {
    value: E;
    left: TreeNode<E> | null;
    right: TreeNode<E> | null;

    constructor(val: E) {
        this.value = val;
    }
}

class Tree<E> {
    root: TreeNode<E> | null;

    constructor(arr: E[]) {
        this.root = this.sortedArrayToBST(arr, 0, arr.length);
    }

    sortedArrayToBST(arr: E[], start: number, end: number): TreeNode<E> | null {
        if (start > end) return null;
        const mid = Math.floor((start - end) / 2);
        const node = new TreeNode(arr[mid]);

        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);

        return node;
    }

    find(value: E): TreeNode<E> | null {
        let curr = this.root;
        
        while (curr) {
            if (value === curr.value) { 
                return curr;
            } else if (value > curr.value) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        return null;
    }

    insert(value: E): void {
        const node = new TreeNode(value);

        if (!this.root) {
            this.root = node;
            return;
        }

        let curr: TreeNode<E> | null = this.root;

        while (curr) {
            if (value < curr.value && !curr.left) {
                curr.left = node;
                return;
            } else if (value < curr.value) {
                curr = curr.left;
            } else if (value > curr.value && !curr.right) {
                curr.right = node;
                return;
            } else if (value > curr.value) {
                curr = curr.right;
            }
        }
    }

    deleteRec(root: TreeNode<E> | null, value: E): TreeNode<E> | null {
        if (!root) return root;

        if (root.value > value) {
            root.left = this.deleteRec(root.left, value)
        } else if (root.value < value) {
            root.right = this.deleteRec(root.right, value)
        }

        if (root.left === null) {
            let temp = root.right;
            root = null;
            return temp;
        } else if (root.right === null) {
            let temp = root.left;
            root = null;
            return temp;
        } else {
            let succParent = root;
            let succ: TreeNode<E> | null = root.right;

            while (succ.left) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.value = succ.value;

            succ = null;
            return root;
        }
    }

    delete(value: E): TreeNode<E> | null {
        this.root = this.deleteRec(this.root, value);
        return this.root;
    }

    levelOrderRec(queue: TreeNode<E>[], acc: E[], fn?: (x: E) => E): E[] {
        if (queue.length < 1) return acc;
        
        const func = fn ?? ((x: E): E => x);

        let nextQueue: TreeNode<E>[] = [];
        let nextAcc = [...acc];

        queue.forEach((item: TreeNode<E>) => {
            if (item.left) nextQueue.push(item.left);
            if (item.right) nextQueue.push(item.right);
            nextAcc.push(func(item.value));
        });

        return this.levelOrderRec(nextQueue, nextAcc, func);
    }

    levelOrder(fn?: (x: E) => E): E[] | null {
        if (!this.root) return null;
        else return this.levelOrderRec([this.root], [], fn);
    }


    // Write inorder, preorder, and postorder functions that accept a function parameter. 
    // Each of these functions should traverse the tree in their respective depth-first order 
    // and yield each node to the provided function given as an argument. 
    // The functions should return an array of values if no function is given.

    // inOrder: Left, Root, Right.
    // This means the LEFTMOST node is the FIRST node.
    // Let's implement this recursively.
    // Inputs: root: TreeNode<E>, acc: E[], fn?: (x: E) => E)
    // Outputs: E[]
    // Case 1: root.left is null and root.right is not null
    // -> apply fn to root, add to accumulator
    // -> recursively call function on root.right
    // Case 2: root.left is not null
    // -> recursively call function on root.left
    // Case 3: root.left and root.right are both null
    // -> apply fn to root, add to accumulator
    // -> go back up the chain?

    inOrderRec(root: TreeNode<E> | null, acc: E[], fn?: (x: E) => E): E[] | null {
        //WIP

        if (!root) return null;

        const func = fn ?? ((x: E): E => x);
         
        if (root.left) {
            this.inOrderRec(root.left, acc, func);
        }   

        return acc;
    }

    heightRec(root: TreeNode<E> | null): number {
        if (!root) return -1;
        else if (!root.left && !root.right) return 1;
        else if (!root.left && root.right) return this.heightRec(root.right);
        else if (!root.right && root.left) return this.heightRec(root.left);
        else return Math.max(this.heightRec(root.left), this.heightRec(root.right)) + 1
    }

    height(): number {
        return this.heightRec(this.root);
    }

    depthRec(node: TreeNode<E> | null, root: TreeNode<E> | null): number {
        if (!node || !root) return -1;
        else if (node.value === root.value) return 0;
        else if (!root.left || node.value > root.value) return 1 + this.depthRec(node, root.right);
        else if (!root.right || node.value <  root.value) return 1 + this.depthRec(node, root.left);
        else return -1;
    }

    depth(node: TreeNode<E> | null): number {
        return this.depthRec(node, this.root);
    }

    isBalancedRec(root: TreeNode<E> | null): boolean {
        if (!root) return false;
        else if (!root.left && this.heightRec(root.right) <= 1) return true;
        else if (!root.right && this.heightRec(root.left) <= 1) return true;
        else if (!root.left || !root.right) return false;

        const smallHeightDifference = Math.abs(this.heightRec(root.left) - this.heightRec(root.right)) <= 1;
        return smallHeightDifference && this.isBalancedRec(root.left) && this.isBalancedRec(root.right);
    }

    isBalanced(): boolean {
        return this.isBalancedRec(this.root);
    }

    rebalance() {
        //WIP
    }
}
