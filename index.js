var graph = Viva.Graph.graph();

var graphics = Viva.Graph.View.svgGraphics(), nodeSize = 24;

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

var mat_g_2 = [
  [0, 1, 0, 0, 2, 5, 1],
  [4, 0, 6, 2, 0, 5, 0],
  [0, 0, 0, 2, 0, 0, 0],
  [5, 3, 0, 0, 6, 0, 0],
  [0, 0, 4, 0, 7, 0, 0],
  [2, 0, 0, 8, 0, 0, 7],
  [1, 0, 0, 9, 1, 9, 0]
];

function matrixToGraph(matrix, graph) {
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

matrixToGraph(mat_g_2, graph);

graphics.node(function(node) {
  var ui = Viva.Graph.svg('g'),

  svgText = Viva.Graph.svg('text').attr('y', '5px')
                                  .attr('text-anchor', 'middle')
                                  .attr('fill', 'black')
                                  .text(node.id);

  img = Viva.Graph.svg('circle')
                  .attr('fill', 'white')
                  .attr('r', nodeSize/1.5)
                  .attr('stroke', 'gray');
  
  ui.append(img);
  ui.append(svgText);
  return ui;
}).placeNode(function(nodeUI, pos) {
  nodeUI.attr('transform', 'translate(' + pos.x + ',' + pos.y + ')');
});

graphics.link(function(link){
  return Viva.Graph.svg('path')
             .attr('stroke', 'black')
             .attr('stroke-width', '2');
}).placeLink(function(linkUI, fromPos, toPos) {
  // linkUI - is the object returend from link() callback above.
  var data = 'M' + fromPos.x + ',' + fromPos.y +
             'L' + toPos.x + ',' + toPos.y;
  
  linkUI.attr("d", data);
});

var gr = new Graph(mat_g_2);
var start = '3'
var end = '6'
var list = dijkstra(gr, start, end);
list = list[Object.keys(list)[0]];

console.log('list: ', list);

var path = [start].concat(Object.keys(list));

console.log('path: ', path);

var layout = Viva.Graph.Layout.forceDirected(graph, {
  springLength : 70,
  springCoeff : 0.00005,
  dragCoeff : 0.07,
  gravity : -8
});

var renderer = Viva.Graph.View.renderer(graph, {
  graphics: graphics,
  layout: layout
});

renderer.run();

for (var i = 0; i < path.length; i++) {
  graph.forEachLink(function(link) {
    var linkUI = graphics.getLinkUI(link.id);
  
    if ((link.fromId === path[i] && link.toId === path[i+1]) || (link.fromId === path[i+1] && link.toId === path[i])) {
      console.log('lol')
      linkUI.attr('stroke', 'red');
    }
  });
}
