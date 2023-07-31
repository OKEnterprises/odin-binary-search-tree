class TreeNode<E> {
    value: E;
    left: TreeNode<E>;
    right: TreeNode<E>;

    constructor(val: E) {
        this.value = val;
    }
}