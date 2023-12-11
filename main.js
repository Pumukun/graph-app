class Graph {
    constructor(arg) {
        if (Array.isArray(arg)) {
            this.adjMatrix = arg;
            this.size = this.adjMatrix.length;
            this.adjList = this.toList(this.adjMatrix);
        }
        else if (typeof arg === "object") {
            this.adjList = arg;
            this.size = Object.keys(this.adjList).length;
            this.adjMatrix = this.toMatrix(this.adjList);
        }
        else {
            throw "lolxd";
        }
    }
    toList(arg) {
        let list = new Object();
        for (let i = 0; i < arg.length; i++) {
            let tmpVer = new Object();
            arg[i].forEach(function (element, index) {
                if (element !== 0) {
                    tmpVer[index] = element;
                }
            });
            list[i] = tmpVer;
            tmpVer = {};
        }
        return list;
    }
    toMatrix(arg) {
        let matrix = new Array(Object.keys(arg).length).fill(0).map(() => new Array(Object.keys(arg).length).fill(0));
        for (const [key, val] of Object.entries(arg)) {
            for (const [ver, cost] of Object.entries(val)) {
                matrix[key][ver] = cost;
            }
        }
        return matrix;
    }
    getMatrix() { return this.adjMatrix; }
    getList() { return this.adjList; }
    show() { console.log(this.adjList); }
    showMatrix() { console.log(this.adjMatrix); }
}
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(node, priority) {
        this.heap.push({ node, priority });
        this.bubbleUp();
    }
    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.priority >= parent.priority)
                break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
function findMinDistance(distances, visited) {
    let minDistance = Infinity;
    let minIndex = -1;
    for (let i = 0; i < distances.length; i++) {
        if (visited[i] === false && distances[i] <= minDistance) {
            minDistance = distances[i];
            minIndex = i;
        }
    }
    return minIndex;
}
function dijkstra(pgraph, start) {
    let graph = pgraph.getMatrix();
    const n = graph.length;
    const distances = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    distances[start] = 0;
    const pq = new PriorityQueue();
    pq.enqueue(start, 0);
    while (!pq.isEmpty()) {
        const { node } = pq.dequeue();
        visited[node] = true;
        for (let i = 0; i < n; i++) {
            if (graph[node][i] > 0 && visited[i] === false) {
                const distance = distances[node] + graph[node][i];
                if (distance < distances[i]) {
                    distances[i] = distance;
                    pq.enqueue(i, distance);
                }
            }
        }
    }
    return distances;
}
var list_g_1 = {
    0: { 1: 3, 2: 2, 4: 10 },
    1: { 0: 1, 3: 5 },
    2: { 0: 49, 4: 1 },
    3: { 1: 1, 4: 1 },
    4: { 0: 1, 2: 3, 3: 45 }
};
var mat_g_1 = [
    [0, 3, 2, 0, 10],
    [1, 0, 0, 5, 0],
    [49, 0, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [1, 0, 3, 45, 0]
];
var list_g_2 = {
    0: { 0: 1, 1: 1, 2: 1 },
    1: { 0: 1, 2: 0 },
    2: { 0: 1, 1: 1 }
};
var mat_g_2 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
];
function main() {
    var g = new Graph(list_g_1);
    g.show();
    g.showMatrix();
    console.log(dijkstra(g, 0));
}
main();
