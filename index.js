var graph = Viva.Graph.graph();

var graphics = Viva.Graph.View.svgGraphics(), nodeSize = 24;

var matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 2],
  [1, 0, 0, 2],
  [0, 2, 2, 0]
];

var mat_g_1 = [
  [0, 3, 2, 0, 10], 
  [3, 0, 7, 5, 0], 
  [2, 7, 0, 0, 1], 
  [0, 5, 0, 0, 45], 
  [10, 0, 1, 45, 0]
];

var mat_g_2 = [
  [0, 1, 0, 5, 2, 5, 1],
  [1, 0, 6, 3, 0, 5, 0],
  [0, 6, 0, 2, 4, 6, 0],
  [5, 3, 2, 0, 6, 0, 9],
  [2, 0, 4, 6, 7, 9, 1],
  [5, 0, 6, 7, 0, 0, 9],
  [1, 0, 0, 9, 1, 9, 0]
];

var GRAPH = mat_g_2;

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

matrixToGraph(GRAPH, graph);

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

var gr = new Graph(GRAPH);
var start = '2';
var end = '6';
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

graphics.getNodeUI(start).childNodes[0].attr('stroke', 'blue').attr('stroke-width', '2px');
graphics.getNodeUI(end).childNodes[0].attr('stroke', 'red').attr('stroke-width', '2px');

for (let i = 1; i < path.length - 1; i++) {
  graphics.getNodeUI(path[i]).childNodes[0].attr('stroke-width', '2px');
}
 
for (let i = 0; i < path.length; i++) {
  graph.forEachLink(function(link) {
    let linkUI = graphics.getLinkUI(link.id);

    let tmpNode = path[i];
    let successorNode = path[i+1];

    let fromId = link.fromId;
    let toId = link.toId;

    console.log(tmpNode, successorNode, fromId, toId);

    if ((tmpNode == fromId && successorNode == toId) || (tmpNode == toId && successorNode == fromId)) {
      console.log('lol')
      linkUI.attr('stroke', 'red');
    }
  });
}
