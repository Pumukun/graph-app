class Graph<T> {
    private adjMatrix: T[][];
    private adjList: Object;
    private size: number;

    public constructor(arg: T[][] | Object) { 
        if (Array.isArray(arg)) {
            this.adjMatrix = arg;
            this.size = this.adjMatrix.length; 
            this.adjList = this.toList(this.adjMatrix);
        } else if (typeof arg === "object") {
            this.adjList = arg;
            this.size = Object.keys(this.adjList).length;
            this.adjMatrix = this.toMatrix(this.adjList);
        } else {
            throw "lolxd"; 
        }
    }

    private toList(arg: T[][]): Object {
        let list = new Object();

        for (let i: number = 0; i < arg.length; i++) {
            let tmpVer = new Object();
            arg[i].forEach(function(element, index) {
                if (element !== 0) { tmpVer[index] = element; }
            });
            list[i] = tmpVer;
            tmpVer = {};
        }
        return list;
    }

    private toMatrix(arg: Object): T[][] {
        let matrix = new Array(Object.keys(arg).length).fill(0).map(() => new Array(Object.keys(arg).length).fill(0));
        for (const [key, val] of Object.entries(arg)) {
            for (const [ver, cost] of Object.entries(val)) {
                matrix[key][ver] = cost;
            }
        }
        return matrix;
    }
    
    public getMatrix() { return this.adjMatrix; }

    public getList() { return this.adjList; }
    
    public show() { console.log(this.adjList); }
    
    public showMatrix() { console.log(this.adjMatrix); }
}


class PriorityQueue {
    private heap: { node: any, priority: number }[];

    constructor() {
        this.heap = [];
    }

    public enqueue(node: any, priority: number): void {
        this.heap.push({ node, priority });
        this.bubbleUp();
    }

    public dequeue(): { node: any, priority: number } {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end!;
            this.sinkDown();
        }
        return min;
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (element.priority >= parent.priority) break;

            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    private sinkDown(): void {
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
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }
}

function findMinDistance(distances: any[], visited: boolean[]): number {
    let minDistance: number = Infinity;
    let minIndex: number = -1;

    for (let i: number = 0; i < distances.length; i++) {
        if (visited[i] === false && distances[i] <= minDistance) {
            minDistance = distances[i];
            minIndex = i;
        }
    }

    return minIndex;
}

interface ShortestPaths {
  [key: string]: { [key: string]: number };
}

function dijkstra(pgraph: Graph<any>, v1: string, v2?: string) {
    let graph: { [keu: string]: any } = pgraph.getList();
    const distances: { [key: string]: number } = {};
    const visited: { [key: string]: boolean } = {};
    const previous: { [key: string]: string | null } = {};

    for (const vertex in graph) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
        previous[vertex] = null;
    }

    distances[v1] = 0;

    while (true) {
        let minDistance = Infinity;
        let minVertex = null;

        for (const vertex in graph) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minDistance = distances[vertex];
                minVertex = vertex;
            }
        }

        if (minVertex === null) {
            break;
        }

        visited[minVertex] = true;

        for (const neighbor in graph[minVertex]) {
            const distance = graph[minVertex][neighbor];

            if (distances[minVertex] + distance < distances[neighbor]) {
                distances[neighbor] = distances[minVertex] + distance;
                previous[neighbor] = minVertex;
            }
        }
    }

    if (v2) {
        if (distances[v2] === Infinity) {
            return -1; // Вершина v2 недостижима из v1
        }

        const path: { [key: string]: number } = {};
        let currentVertex = v2;

        while (currentVertex !== v1) {
            const previousVertex = previous[currentVertex];
            path[currentVertex] = graph[previousVertex][currentVertex];
            currentVertex = previousVertex!;
        }

        return { [v2]: path };
    }

    return distances;
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

var list_g_2 = {
    0: {0: 1, 1: 1, 2: 1},
    1: {0: 1, 2: 0},
    2: {0: 1, 1: 1}
};

var mat_g_2 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
];

var lol_graph = [
    [0, 8, 2, 0, 5, 1, 7, 3, 5, 9, 3, 7],
    [8, 0, 7, 5, 7, 1, 9, 1, 1, 6, 6, 9],
    [2, 7, 0, 9, 3, 5, 1, 9, 1, 0, 8, 0],
    [0, 5, 9, 0, 8, 8, 4, 0, 3, 5, 7, 8],
    [5, 7, 3, 8, 0, 1, 7, 3, 0, 6, 8, 9],
    [1, 1, 5, 8, 1, 0, 7, 0, 0, 8, 6, 9],
    [7, 9, 1, 4, 7, 7, 0, 0, 7, 2, 5, 8],
    [3, 1, 9, 0, 3, 0, 0, 0, 1, 8, 8, 1],
    [5, 1, 1, 3, 0, 0, 7, 1, 0, 8, 6, 9],
    [9, 6, 0, 5, 6, 8, 2, 8, 8, 0, 2, 7],
    [3, 6, 8, 7, 8, 6, 5, 8, 6, 2, 0, 4],
    [7, 9, 0, 8, 9, 9, 8, 1, 9, 7, 4, 0]
]

function main() {
    var g = new Graph<number>(lol_graph);
    console.log(dijkstra(g, '3', '11'));
} main();

