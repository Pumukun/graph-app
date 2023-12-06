/**
 * @class
 * @template {T}
*/
class Graph {
    /**
     * @type {Array.<Array.<T>>} adjMatrix
     * @type {object} adjList
    */
    #adjMatrix = [[]]
    #adjList = {}
    
    /*
     * @constructor
     * @param {Array.<Array.<T>>|object} arg
     * @return {void}
    */
    constructor(arg) {
        if (Array.isArray(arg)) {
            this.#adjMatrix = arg;

        } else if (typeof arg === "object") {
            this.#adjList = arg;

        } else {
            throw "lolxd"; 
        }
    }
}

/** @return {void} */
function main() {

} main();
