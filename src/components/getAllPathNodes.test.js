const getAllPathNodes = require("./getAllPathNodes");

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
    const result = getAllPathNodes([]);
    expect(result).toEqual([]);
  });
});

describe("given a non-list", () => {
  test("it should throw", () => {
    expect(() => getAllPathNodes({})).toThrow("Expected an Array");
  });
});

describe("given a list with one path", () => {
  const list_with_one_path = ["/folder/subfolder/thing/"];

  const result = getAllPathNodes(list_with_one_path);

  expect(result).toHaveLength(4);
  expect(result).toContainObject({ path: "/" });
  expect(result).toContainObject({ path: "/folder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/" });
  expect(result).toContainObject({ path: "/folder/subfolder/thing/" });
});
