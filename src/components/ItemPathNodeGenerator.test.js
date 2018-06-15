const itemPathNodeGenerator = require("./ItemPathNodeGenerator");

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false
      };
    }
  }
});

describe("given an empty path list", () => {
  test("it should return an empty object", () => {
    const result = itemPathNodeGenerator.getAllPathNodes([]);
    expect(result).toEqual([]);
  });
});

describe("given a non-list", () => {
  test("it should throw", () => {
    expect(() => itemPathNodeGenerator.getAllPathNodes({})).toThrow(
      "Expected an Array"
    );
  });
});

describe("given a list with one path", () => {
  const list_with_one_path = ["/folder/subfolder/thing/"];

  const result = itemPathNodeGenerator.getAllPathNodes(list_with_one_path);

  expect(result).toHaveLength(4);
  expect(result).toContainObject({ path: "/" });
  expect(result).toContainObject({ path: "/folder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/thing/" });
});

describe("given a list with two identical paths", () => {
  const list_with_two_identical_paths = [
    "/folder/subfolder/thing/",
    "/folder/subfolder/thing/"
  ];

  const result = itemPathNodeGenerator.getAllPathNodes(
    list_with_two_identical_paths
  );

  expect(result).toHaveLength(4);
  expect(result).toContainObject({ path: "/" });
  expect(result).toContainObject({ path: "/folder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/thing/" });
});

describe("given a list with two overlapping paths", () => {
  const list_with_two_overlapping_paths = [
    "/folder/subfolder/thing/",
    "/folder/subfolder/some-other-thing/"
  ];

  const result = itemPathNodeGenerator.getAllPathNodes(
    list_with_two_overlapping_paths
  );

  expect(result).toHaveLength(5);
  expect(result).toContainObject({ path: "/" });
  expect(result).toContainObject({ path: "/folder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/thing/" });
  expect(result).toContainObject({
    path: "/folder/subfolder/some-other-thing/"
  });
});
