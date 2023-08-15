const Module = require("../ module");

describe("module测试单元", () => {
  describe("构造函数", () => {
    describe("imports", () => {
      it("单个import", () => {
        const code = `import { a as aa } from '../module'`;
        const module = new Module({ code });
        expect(module.imports).toEqual({
          aa: {
            localName: "aa",
            name: "a",
            source: "../module",
          },
        });
      });

      it("多个import", () => {
        const code = `import { a as aa, b } from '../module'`;
        const module = new Module({ code });
        expect(module.imports).toEqual({
          aa: {
            localName: "aa",
            name: "a",
            source: "../module",
          },
          b: {
            localName: "b",
            name: "b",
            source: "../module",
          },
        });
      });
    });

    describe("exports", () => {
      it("单个exports", () => {
        const code = `export var a = 1;`;
        const module = new Module({ code });
        expect(module.exports["a"].localName).toBe("a");
        expect(module.exports["a"].node).toBe(module.ast.body[0]);
        expect(module.exports["a"].expression).toBe(
          module.ast.body[0].declaration
        );
      });

      // it("多个import", () => {
      //   const code = `import { a as aa, b } from '../module'`;
      //   const module = new Module({ code });
      //   expect(module.imports).toEqual({
      //     aa: {
      //       localName: "aa",
      //       name: "a",
      //       source: "../module",
      //     },
      //     b: {
      //       localName: "b",
      //       name: "b",
      //       source: "../module",
      //     },
      //   });
      // });
    });

    describe("definitions", () => {
      it("definitions", () => {
        const code = `const a = 1;`;
        const module = new Module({ code });

        expect(module.definitions).toEqual({
          a: module.ast.body[0],
        });
      });
    });
  });

  describe("expendAllStatement", () => {
    it("基础", () => {
      const code = `
        const a = () => 1;
        const b = () => 2;
        a();
      `;

      const module = new Module({ code });
      const statements = module.expandAllStatement();
      // 合并后，length=2
      expect(statements.length).toBe(2);

      expect(module.code.snip(statements[0].start, statements[0].end).toString()).toBe('const a = () => 1;');
    });
  });
});
