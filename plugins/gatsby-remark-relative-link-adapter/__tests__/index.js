const Remark = require("remark");
const visit = require(`unist-util-visit`);

const plugin = require("../");

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true
});

describe("plain markdown links", () => {
  test("it should prefix ../ and remove the .md extension", () => {
    const markdownAST = remark.parse(
      `
      [a-markdown-entry](./a-markdown-entry.md)
      `.trim()
    );

    const transformed = plugin({ markdownAST });

    visit(transformed, "link", node => {
      expect(node.url).toEqual("../a-markdown-entry/");
    });
  });
});
