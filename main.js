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
    
    #size = 0

    /*
     * @constructor
     * @param {Array.<Array.<T>>|object} arg
     * @return {void}
    */
    constructor(arg) {
        if (Array.isArray(arg)) {
            this.#adjMatrix = arg;
            this.#size = this.#adjMatrix.length; 
            this.#adjList = new Object();
             
            for (var i = 0; i < this.#size; i++) {
                var tmpVer = new Array();
                this.#adjMatrix[i].forEach(function(element, index) {
                    if (element !== 0) { tmpVer.push(index); }
                });
                this.#adjList[i] = tmpVer;
                tmpVer = [];
            }
        } else if (typeof arg === "object") {
            this.#adjList = arg;
            this.#size = Object.keys(this.#adjList).length;
            this.#adjMatrix = new Array();
	        for (var i = 0; i < this.#size; i++) {
	            this.#adjMatrix[i] = [];
	            for (var j = 0; j < this.#size; j++) {
	                this.#adjMatrix[i][j] = 0;
	            }
            }
            for (const [key, val] of Object.entries(this.#adjList)) {
                for (const ver of val) {
                    this.#adjMatrix[key][ver] = 1;
                }
            }
        } else {
            throw "lolxd"; 
        }
    }
    
    /** @return void */
    show() { console.log(this.#adjList); }
    
    /** @return void */
    showMatrix() { console.log(this.#adjMatrix); }
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
    
    var g = new Graph(list_g_1);
    g.show();
    g.showMatrix();
} main();
