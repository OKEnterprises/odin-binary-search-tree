class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number) {
        this.value = val;
    }
}

export class Tree {
    root: TreeNode | null;

    constructor(arr: number[]) {
        this.root = this.sortedArrayToBST(arr, 0, arr.length - 1);
    }

    sortedArrayToBST(arr: number[], start: number = 0, end: number = arr.length - 1): TreeNode | null {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(Math.floor(arr[mid]));

        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);

        return node;
    }

    find(value: number): TreeNode | null {
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

    insert(value: number): void {
        const node = new TreeNode(value);

        if (!this.root) {
            this.root = node;
            return;
        }

        let curr: TreeNode | null = this.root;

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

    deleteRec(root: TreeNode | null, value: number): TreeNode | null {
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
            let succ: TreeNode | null = root.right;

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

    delete(value: number): TreeNode | null {
        this.root = this.deleteRec(this.root, value);
        return this.root;
    }

    levelOrder(queue: (TreeNode | null)[] = [this.root], acc: number[] = [], fn: (x: number) => number = ((x) => x)): number[] {
        if (queue.length < 1) return acc;

        let nextQueue: TreeNode[] = [];
        let nextAcc = [...acc];

        queue.forEach((item: TreeNode | null) => {
            if (!item) return;
            if (item.left) nextQueue.push(item.left);
            if (item.right) nextQueue.push(item.right);
            nextAcc.push(fn(item.value));
        });

        return this.levelOrder(nextQueue, nextAcc, fn);
    }

    inOrder(root: TreeNode | null = this.root, acc: number[] = [], fn: (x: number) => number = ((x) => x)): number[] | null {
        if (!root) return null;
         
        if (root.left) this.inOrder(root.left, acc, fn);
        acc.push(fn(root.value));
        if (root.right) this.inOrder(root.right, acc, fn);

        return acc;
    }

    preOrder(root: TreeNode | null = this.root, acc: number[] = [], fn: (x: number) => number = ((x) => x)): number[] | null {
        if (!root) return null;

        acc.push(fn(root.value));

        if (root.left) this.preOrder(root.left, acc, fn);
        if (root.right) this.preOrder(root.right, acc, fn);

        return acc;
    }

    postOrder(root: TreeNode | null = this.root, acc: number[] = [], fn: (x: number) => number = ((x) => x)): number[] | null {
        if (!root) return null;
        if (root.left) this.postOrder(root.left, acc, fn);
        if (root.right) this.postOrder(root.right, acc, fn);

        acc.push(fn(root.value));

        return acc;
    }

    height(root: TreeNode | null = this.root): number {
        if (!root) return -1;
        else if (!root.left && !root.right) return 1;
        else if (!root.left && root.right) return this.height(root.right);
        else if (!root.right && root.left) return this.height(root.left);
        else return Math.max(this.height(root.left), this.height(root.right)) + 1
    }


    depth(node: TreeNode | null, root: TreeNode | null = this.root): number {
        if (!node || !root) return -1;
        else if (node.value === root.value) return 0;
        else if (!root.left || node.value > root.value) return 1 + this.depth(node, root.right);
        else if (!root.right || node.value <  root.value) return 1 + this.depth(node, root.left);
        else return -1;
    }

    isBalanced(root: TreeNode | null = this.root): boolean {
        if (!root) return false;
        else if (!root.left && this.height(root.right) <= 1) return true;
        else if (!root.right && this.height(root.left) <= 1) return true;
        else if (!root.left || !root.right) return false;

        const smallHeightDifference = Math.abs(this.height(root.left) - this.height(root.right)) <= 1;
        return smallHeightDifference && this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance(root: TreeNode | null = this.root): TreeNode | null {
        let arr = this.levelOrder([root], []);
        arr.sort((a, b) => a - b);

        this.root = this.sortedArrayToBST(arr);
        return this.root;
    }
}


