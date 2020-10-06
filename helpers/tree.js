

const makingTree = function (data) {
    let root;
    let tree = [];
    const idMapping = data.reduce((acc, el, i) => {
        acc[el.name] = i;
        return acc;
    }, {});

    data.forEach(el => {

        if (el.parentName === 'undefined') {
            root = el;
            return;
        }

        const parentEl = data[idMapping[el.parentName]];

        parentEl.children = [...(parentEl.children || []), el];
    });

    tree[0] = root;
    return tree;
}


module.exports = makingTree;