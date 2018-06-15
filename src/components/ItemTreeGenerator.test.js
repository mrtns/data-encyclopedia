const itemTreeGenerator = require("./ItemTreeGenerator");
const itemPathNodeGenerator = require("./ItemPathNodeGenerator");

describe("given an empty item path node list", () => {
  test("it should return an empty list", () => {
    const result = itemTreeGenerator.getTreeFromPathNodes([]);
    expect(result).toEqual([]);
  });
});

describe("given a path node list with a single root node", () => {
  test("it should return a tree with a single node", () => {
    console.log(itemPathNodeGenerator.getAllPathNodes(["/"]));
    const path_node_list_with_single_node = [
      {
        path: "/",
        parentPath: "",
        base: "",
        dir: "/",
        root: "/",
        resolvesToItem: true
      }
    ];
    const result = itemTreeGenerator.getTreeFromPathNodes(
      path_node_list_with_single_node
    );
    expect(result).toHaveLength(1);
    expect(result).toContainObject({ path: "/", children: [] });
  });
});

describe("given a path node list representing a folder one level deep", () => {
  test("it should return a tree with a single branch of two nodes", () => {
    const path_node_list_with_single_node = [
      {
        path: "/",
        parentPath: "",
        base: "",
        dir: "/",
        root: "/",
        resolvesToItem: false
      },
      {
        path: "/a-folder/",
        parentPath: "/",
        base: "a-folder",
        dir: "/",
        root: "/",
        resolvesToItem: true
      }
    ];

    const result = itemTreeGenerator.getTreeFromPathNodes(
      path_node_list_with_single_node
    );

    expect(result).toHaveLength(1);
    expect(result[0].children).toHaveLength(1);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "/",
          children: expect.arrayContaining([
            expect.objectContaining({
              path: "/a-folder/"
            })
          ])
        })
      ])
    );
  });
});
