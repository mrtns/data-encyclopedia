import path from "path";

function getAllPathNodes(list_of_item_paths) {
  if (list_of_item_paths instanceof Array === false) {
    throw new Error(
      `Expected an Array of file paths, but got ${list_of_item_paths}`
    );
  }

  function parsePath(paths, currentPath) {
    const currentPathParsed = path.parse(currentPath);

    const parentPath =
      currentPathParsed.base === ""
        ? ""
        : path.join(currentPathParsed.dir, path.sep);

    const pathNode = {
      path: path.join(currentPath, path.sep),
      parentPath: parentPath,
      base: currentPathParsed.base,
      dir: currentPathParsed.dir,
      root: currentPathParsed.root,
      resolvesToItem: list_of_item_paths.includes(currentPath)
    };
    if (!paths.map(p => p.path).includes(pathNode.path)) {
      paths.push(pathNode);
    }

    if (pathNode.base !== "") {
      parsePath(paths, pathNode.dir);
    }
    return paths;
  }

  return list_of_item_paths.reduce(parsePath, []);
}

module.exports = { getAllPathNodes };
