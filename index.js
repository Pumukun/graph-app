var graph = Viva.Graph.graph();


var graphics = Viva.Graph.View.svgGraphics(), nodeSize = 24;
// graph.addNode(0);
// graph.addNode(2);
// graph.addLink(1, 2);
// graph.addLink(0, 2);

var matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0]
];

var mat_g_1 = [
  [0, 3, 2, 0, 10], 
  [1, 0, 0, 5, 0], 
  [49, 0, 0, 0, 1], 
  [0, 1, 0, 0, 1], 
  [1, 0, 3, 45, 0]
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

function matrixToGraph(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    graph.addNode(i);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (matrix[i][j] > 0) {
        graph.addLink(i, j);
      }
    }
  }
};

matrixToGraph(mat_g_1);

graphics.node(function(node) {
  var ui = Viva.Graph.svg('g'),

  svgText = Viva.Graph.svg('text').attr('y', '4px')
                                  .attr('text-anchor', 'middle')
                                  .attr('fill', 'black')
                                  .text(node.id);

  img = Viva.Graph.svg('circle')
                  .attr('fill', 'lightblue')
                  .attr('r', nodeSize/2);
  
  ui.append(img);
  ui.append(svgText);
  return ui;
}).placeNode(function(nodeUI, pos) {
  nodeUI.attr('transform', 'translate(' + pos.x + ',' + pos.y + ')');
});

var renderer = Viva.Graph.View.renderer(graph, {
  graphics : graphics
});

renderer.run();
