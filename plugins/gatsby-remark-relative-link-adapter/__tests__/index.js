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

describe("link to an entry in a subfolder", () => {
  test("it should do something", () => {
    const markdownAST = remark.parse(
      `
      [entry-folder/a-markdown-entry-in-a-folder](./entry-folder/a-markdown-entry-in-a-folder.md)
      `.trim()
    );

    const transformed = plugin({ markdownAST });

    visit(transformed, "link", node => {
      expect(node.url).toEqual("../entry-folder/a-markdown-entry-in-a-folder/");
    });
  });
});
