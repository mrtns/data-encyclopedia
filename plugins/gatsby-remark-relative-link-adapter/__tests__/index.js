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
    const markdownNode = {
      fileAbsolutePath: "/some/absolute/path/of/entry.md"
    };
    const markdownAST = remark.parse(
      `
      [a-markdown-entry](./a-markdown-entry.md)
      `.trim()
    );

    const transformed = plugin({ markdownAST, markdownNode });

    visit(transformed, "link", node => {
      expect(node.url).toEqual("../a-markdown-entry/");
    });
  });
});

describe("named entries in subfolders", () => {
  describe("link to an entry in a subfolder", () => {
    test("it should prefix ../ and remove the .md extension", () => {
      const markdownNode = {
        fileAbsolutePath:
          "/entries/an-entry-with-a-link-to-an-entry-in-a-subfolder.md"
      };
      const markdownAST = remark.parse(
        `
        [entry-folder/a-markdown-entry-in-a-folder](./entry-folder/a-markdown-entry-in-a-folder.md)
        `.trim()
      );

      const transformed = plugin({ markdownAST, markdownNode });

      visit(transformed, "link", node => {
        expect(node.url).toEqual(
          "../entry-folder/a-markdown-entry-in-a-folder/"
        );
      });
    });
  });
  describe("link from an entry in a subfolder", () => {
    test("it should prefix ../ and remove the .md extension", () => {
      const markdownNode = {
        fileAbsolutePath:
          "/entries/subfolder/entry-with-link-to-entry-in-parent-folder.md"
      };
      const markdownAST = remark.parse(
        `
        [a-markdown-entry-in-a-parent-folder](./../a-markdown-entry-in-a-parent-folder.md)
        `.trim()
      );

      const transformed = plugin({ markdownAST, markdownNode });

      visit(transformed, "link", node => {
        expect(node.url).toEqual("../../a-markdown-entry-in-a-parent-folder/");
      });
    });
  });
});

describe("default (index) entries in folders", () => {
  describe("link to an index entry in a subfolder", () => {
    test("it should prefix ../, remove the 'index' path part, and remove the .md extension", () => {
      const markdownNode = {
        fileAbsolutePath:
          "/entries/entry-with-link-to-index-entry-in-subfolder.md"
      };
      const markdownAST = remark.parse(
        `
        [entry-folder-with-index](./entry-folder-with-index/index.md)
        `.trim()
      );

      const transformed = plugin({ markdownAST, markdownNode });

      visit(transformed, "link", node => {
        expect(node.url).toEqual("../entry-folder-with-index/");
      });
    });
  });
  describe("link to an index entry in a parent folder", () => {
    test("it should do something", () => {
      const markdownNode = {
        fileAbsolutePath:
          "/entries/parent-entry-folder-with-index/child-entry-folder-with-index/index.md"
      };
      const markdownAST = remark.parse(
        `
        [parent-entry-folder-with-index](./../index.md)
        `.trim()
      );

      const transformed = plugin({ markdownAST, markdownNode });

      visit(transformed, "link", node => {
        expect(node.url).toEqual("../");
      });
    });
  });
});
