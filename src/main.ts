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
        const maxVertex = Math.max(...Object.keys(arg).map(Number));
        const matrix = new Array(maxVertex + 1).fill(0).map(() => new Array(maxVertex + 1).fill(0));

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
            return -1;
        }

        const path: { [key: string]: number } = {};
        let currentVertex = v2;

        while (currentVertex !== v1) {
            const previousVertex = previous[currentVertex];
            path[currentVertex] = distances[currentVertex];
            currentVertex = previousVertex!;
        }

        return { [v2]: path };
    }

    return distances;
}

var list_g_1 = {
    0: {1: 3, 2: 2, 4: 10},
    1: {0: 3, 3: 5},
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
    [0, 1, 0, 0, 2, 5, 1],
    [4, 0, 6, 2, 0, 5, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [5, 3, 0, 0, 6, 0, 0],
    [0, 0, 4, 0, 7, 0, 0],
    [2, 0, 0, 8, 0, 0, 7],
    [1, 0, 0, 9, 1, 9, 0]
  ];

function main() {
    var g = new Graph<number>(list_g_1);
    console.log(dijkstra(g, '1', '3'));
} main();

