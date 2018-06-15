const itemTreeGenerator = require("./ItemTreeGenerator");
const itemPathNodeGenerator = require("./ItemPathNodeGenerator");

describe("given an empty item path node list", () => {
  test("it should return an empty list", () => {
    const result = itemTreeGenerator.getTreeFromPathNodes([]);
    expect(result).toEqual([]);
  });
});

describe("given a single path node", () => {
  test("it should return a tree with a single node", () => {
    const path_node_list_with_single_node = [
      { path: "/", base: "", dir: "/", root: "/", resolvesToItem: true }
    ];
    const result = itemTreeGenerator.getTreeFromPathNodes(
      path_node_list_with_single_node
    );
    expect(result).toHaveLength(1);
    expect(result).toContainObject({ path: "/", children: [] });
  });
});
