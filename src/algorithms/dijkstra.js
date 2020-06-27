export function dijkstra(grid, startNode, finishNode) {
  // if(!startNode || !finishNode || startNode === finishNode){
  //   return false;
  // }
  const visitedNodesInOrder = [];
  startNode.distance=0;
  // nodes[startNode].distance=0;
  // const unVisitedNodes = nodes.slice();
  const unVisitedNode = getAllNodes(grid);
  while(!!unVisitedNodes.length){
    sortNodesByDistance(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();
    //#TODO - HANDLE IMPOSSIBLE 
    // while (currentNode.status === "wall" && unvisitedNodes.length) {
    //   currentNode = closestNode(nodes, unvisitedNodes)
    // }
    // #TODO - HANDLE WALLS
    // if (currentNode.distance === Infinity) {
    //     return false;
    // }
    //#TODO - ANIMATE
    //nodesToAnimate.push(currentNode);
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if(closestNode === finishNode) return visitedNodesInOrder;
    updateNeighbors(closestNode,grid);
  }

}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


function sortNodesByDistance(unVisitedNodes){
  unVisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function closestNode(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.distance > nodes[unvisitedNodes[i]].distance) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


function updateNeighbors(node, grid) {
  let neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance+1;
  }
}

