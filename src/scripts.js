var mainSvg = document.querySelector('svg');
document.getElementsByClassName('wrapper')[0].prepend(mainSvg); 
        
function refreshGraph() {
    graph.forEachLink(function(link) {
        let linkUI = graphics.getLinkUI(link.id);
        linkUI.attr('stroke', 'black');
    });
    graph.forEachNode(function(node) {
        graphics.getNodeUI(node.id).childNodes[0].attr('stroke', 'gray').attr('stroke-width', '1px');
    });
}

var findBtn          = document.getElementById('findPathBtn');
var startVertexInput = document.getElementById('startVertex');
var endVertexInput   = document.getElementById('endVertex');

var pathCostLabel    = document.getElementById('pathCostLabel');
var pathLabel        = document.getElementById('pathLabel');
         
findBtn.addEventListener('click', function() {
    var graphTS = GRAPH;
    var start = startVertexInput.value;
    var end = endVertexInput.value;
    if (end < start) {
        let oend = end;
        end = start;
        start = oend;
    }
    var list = dijkstra(graphTS, start, end);
    pathCostLabel.innerHTML = Object.values(list[Object.keys(list)[0]])[Object.values(list[Object.keys(list)[0]]).length - 1];
    console.log(list);

    list = list[Object.keys(list)[0]];
    var path = [start].concat(Object.keys(list));
    
    var pathStr = ' ';
    for (var i = 0; i < path.length; i++) {
        pathStr += path[i];
        pathStr += ' => ';
    }
    pathStr = pathStr.slice(0, -1).slice(0, -1).slice(0, -1) + ' ';
    pathLabel.innerHTML = '[' + pathStr + ']';

    refreshGraph();

    graphics.getNodeUI(start).childNodes[0].attr('stroke', 'blue').attr('stroke-width', '2px');
    graphics.getNodeUI(end).childNodes[0].attr('stroke', 'red').attr('stroke-width', '2px'); 

    for (let i = 1; i < path.length - 1; i++) {
        graphics.getNodeUI(path[i]).childNodes[0].attr('stroke-width', '2px');
    }
 
    for (let i = 0; i < path.length; i++) {
        graph.forEachLink(function(link) {
            let linkUI = graphics.getLinkUI(link.id);

            let tmpNode = path[i];
            let successorNode = path[i + 1];

            let fromId = link.fromId;
            let toId = link.toId;
 
            if ((tmpNode == fromId && successorNode == toId) || (tmpNode == toId && successorNode == fromId)) {
                linkUI.attr('stroke', 'red');
            } 
        });
    }
});

var springLength = document.getElementById('springLengthSlider');
var springCoeff  = document.getElementById('springCoeffSlider');

var lenLabel     = document.getElementById('lengthLabel');
var coeffLabel   = document.getElementById('coeffLabel');

springLength.addEventListener('input', function() {
    layout.simulator.springLength(springLength.value);
    lenLabel.innerHTML = '';
    lenLabel.innerHTML = springLength.value;
});
springCoeff.addEventListener('input', function() {
    layout.simulator.springCoeff(springCoeff.value);
    coeffLabel.innerHTML = '';
    coeffLabel.innerHTML = springCoeff.value;
});

var fromStartBtn = document.getElementById('findPathFromStart');
fromStartBtn.addEventListener('click', function() {
    var graphTS = GRAPH;
    var start = startVertexInput.value;
    var list = dijkstra(graphTS, start);
   
    pathLabel.innerHTML = objToStr(list);
});

const floatMenu = document.getElementById('floatMenu');
document.getElementById('btn1').addEventListener('click', () => {
    floatMenu.style.display = 'flex';
});
floatMenu.addEventListener('click', (e) => {
    if (e.target === floatMenu) {
        floatMenu.style.display = 'none';
    }
});
const closeMenuBtn = document.getElementById('closeMenu').addEventListener('click', () => {
    floatMenu.style.display = 'none';
});

