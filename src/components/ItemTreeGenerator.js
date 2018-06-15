function getChildren(allPathNodes, parentNodePath) {
  const tree = [];

  for (var pathNode of allPathNodes) {
    if (pathNode.parentPath !== parentNodePath) continue;

    tree.push({
      path: pathNode.path,
      parentPath: pathNode.parentPath,
      // node: pathNode,
      children: getChildren(allPathNodes, pathNode.path)
    });
  }

  return tree;
}

function getTreeFromPathNodes(pathNodes) {
  return getChildren(pathNodes, "");
}
module.exports = { getTreeFromPathNodes };
