var graph = Viva.Graph.graph();


var graphics = Viva.Graph.View.svgGraphics(),
                nodeSize = 24;
                graph.addNode('circleNode');
graph.addNode(2);
graph.addLink(1, 2);

            graphics.node(function(node) {
              // This time it's a group of elements: http://www.w3.org/TR/SVG/struct.html#Groups
              var ui = Viva.Graph.svg('g'),
                  // Create SVG text element with user id as content
                  svgText = Viva.Graph.svg('text').attr('y', '-4px').text(node.id);
                  img = Viva.Graph.svg('image')
                     .attr('width', nodeSize)
                     .attr('height', nodeSize)
                     .link('https://secure.gravatar.com/avatar/' + node.data);

              ui.append(svgText);
              ui.append(img);
              //ui.append(img);
              return ui;
            }).placeNode(function(nodeUI, pos) {
                // 'g' element doesn't have convenient (x,y) attributes, instead
                // we have to deal with transforms: http://www.w3.org/TR/SVG/coords.html#SVGGlobalTransformAttribute
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
                            ')');
            });
            var renderer = Viva.Graph.View.renderer(graph, {
                graphics : graphics
            });
renderer.run();