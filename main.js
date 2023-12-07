/**
 * @class
 * @template {T}
*/
class Graph {
    /**
     * @type {Array.<Array.<T>>} adjMatrix
     * @type {object} adjList
    */
    #adjMatrix
    #adjList 

    /*
     * @constructor
     * @param {Array.<Array.<T>>|object} arg
     * @return {void}
    */
    constructor(arg) {
        if (Array.isArray(arg)) {
            this.#adjMatrix = arg;
            this.#adjList = new Object();
             
            for (var i = 0; i < this.#adjMatrix.length; i++) {
                var tmpVer = new Array();
                this.#adjMatrix[i].forEach(function(element, index) {
                    if (element !== 0) { tmpVer.push(index); }
                });
                this.#adjList[i] = tmpVer;
                tmpVer = [];
            }
            console.log(this.#adjList);
        } else if (typeof arg === "object") {
            this.#adjList = arg;
            this.#adjMatrix = new Array(Object.keys(this.#adjList).length).fill().map(() =>
                new Array(Object.keys(this.#adjList).length.fill(0))); 

        } else {
            throw "lolxd"; 
        }
    }
}

/** @return {void} */
function main() {
    var list_g_1 = {
        0: [1, 2, 4],
        1: [0, 2],
        2: [0, 4],
        3: [1, 4],
        4: [0, 2, 3]
    };

    var mat_g_1 = [
        [0, 1, 1, 0, 1], 
        [1, 0, 0, 1, 0], 
        [1, 0, 0, 0, 1], 
        [0, 1, 0, 0, 1], 
        [1, 0, 1, 1, 0]
    ];

    var mat_g_2 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 0]
    ];
    
    var g = new Graph(mat_g_1);
} main();
