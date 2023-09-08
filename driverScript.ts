import { Tree } from './binarySearchTree.js';

function randomNumber(min: number, max: number): number {
    return Math.random() * max - min;
}

function randomNumberArr(min: number, max: number, len: number, acc: number[] = []): number[] {
    if (acc.length === len) return acc;
    else return randomNumberArr(min, max, len, [...acc, randomNumber(min, max)])
}

const driver = (() => {
    const arr = randomNumberArr(0, 100, 20);
    const tree = new Tree(arr);

    if (!tree.isBalanced()) {
        console.log("Error: Initial tree not balanced");
        return;
    }

    console.log(tree.levelOrder());
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());

    for (let i = 0; i < 10; i++) {
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