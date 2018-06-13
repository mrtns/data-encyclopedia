const path = require("path");

function getAllPathNodes(list_of_item_paths) {
  if (list_of_item_paths instanceof Array === false) {
    throw new Error(
      `Expected an Array of file paths, but got ${list_of_item_paths}`
    );
  }

  function parsePath(paths, currentPath) {
    const currentPathParsed = path.parse(currentPath);

    const pathNode = {
      path: path.join(currentPath, path.sep),
      base: currentPathParsed.base,
      dir: currentPathParsed.dir,
      root: currentPathParsed.root,
      resolvesToItem: list_of_item_paths.includes(currentPath)
    };
    paths.push(pathNode);

    if (pathNode.base !== "") {
      parsePath(paths, pathNode.dir);
    }
    return paths;
  }

  return list_of_item_paths.reduce(parsePath, []);
}

function getAllPathNodesUnique(list_of_item_paths) {
  const allPathNodes = getAllPathNodes(list_of_item_paths);
  const uniquePathNodes = [...new Set(allPathNodes)];

  return uniquePathNodes;
}

module.exports = getAllPathNodesUnique;
