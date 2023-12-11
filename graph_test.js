function toList(arg) {
    var list = new Object();

    for (var i = 0; i < arg.length; i++) {
        var tmpVer = new Object();
        arg[i].forEach(function(element, index) {
            if (element !== 0) { tmpVer[index] = element; }
        });
        list[i] = tmpVer;
        tmpVer = {};
    }
    return list;
}

function toMatrix(arg) {
    var matrix = new Array(Object.keys(arg).length).fill().map(() => new Array(Object.keys(arg).length).fill(0));
    for (const [key, val] of Object.entries(arg)) {
        for (const [ver, cost] of Object.entries(val)) {
            matrix[key][ver] = cost;
        }
    }
    return matrix;
}

var list_g_1 = {
    0: {1: 3, 2: 2, 4: 10},
    1: {0: 1, 3: 5},
    2: {0: 49, 4: 1},
    3: {1: 1, 4: 1},
    4: {0: 1, 2: 3, 3: 45}
};

var mat_g_1 = [
    [0, 3, 2, 0, 10], 
    [1, 0, 0, 5, 0], 
    [49, 0, 0, 0, 1], 
    [0, 1, 0, 0, 1], 
    [1, 0, 3, 45, 0]
];

var mat_g_2 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
];

function main() {
    var list = toList(mat_g_1);
    console.log(list);

    var mat = toMatrix(list_g_1);
    console.log(mat);
} main();

