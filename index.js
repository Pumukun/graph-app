var graph = Viva.Graph.graph();

var graphics = Viva.Graph.View.svgGraphics(), nodeSize = 24;

var GRAPH = new Graph(tree);

matrixToGraph(GRAPH.getMatrix(), graph);

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
  	var data = 'M' + fromPos.x + ',' + fromPos.y +
               'L' + toPos.x + ',' + toPos.y;
  
  	linkUI.attr("d", data);
});

var layout = Viva.Graph.Layout.forceDirected(graph, {
  	springLength : 70,
  	springCoeff : 0.00005,
  	dragCoeff : 0.07,
  	gravity : -8
});

var renderer = Viva.Graph.View.renderer(graph, {
  	graphics: graphics,
  	layout: layout,
  	interactive: 'node scroll'
});

renderer.run();
