const itemTreeGenerator = require("./ItemTreeGenerator");

describe("given an empty item path node list", () => {
  test("it should return an empty list", () => {
    const result = itemTreeGenerator.getTreeFromPathNodes([]);
    expect(result).toEqual([]);
  });
});
