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
}

