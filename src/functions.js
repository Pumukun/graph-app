function matrixToGraph(matrix, graph) {
    for (let i = 0; i < matrix.length; i++) {
      graph.addNode(i);
    }

    for (let i = 0; i < matrix.length; i++) {
      	for (let j = i + 1; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
              graph.addLink(i, j);
            }
      	}
    }
};

function objToStr(list) {
	let resStr = '{ ';
  	for ([key, val] of Object.entries(list)) {
      	resStr += `${key}: ${val}, `;
  	} 
	resStr = resStr.slice(0, -1).slice(0, -1) + ' }';
  	return resStr;
};