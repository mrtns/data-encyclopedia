function getChildren(allPathNodes, parentPathNode) {
  const tree = [];

  for (var pathNode of allPathNodes) {
    console.log(pathNode);
    if (pathNode.dir !== parentPathNode) continue;

    tree.push({
      path: pathNode.path,
      node: pathNode,
      children: getChildren(allPathNodes, pathNode.base)
    });
  }

  return tree;
}

function getTreeFromPathNodes(pathNodes) {
  return getChildren(pathNodes, "/");
}
module.exports = { getTreeFromPathNodes };
