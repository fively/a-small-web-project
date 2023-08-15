const acorn = require("acorn");
const walk = require("../lib/walk");

const code = `
      const a = 1;
      function f1() {
        const b = 2;
        function f2() {
          const c = 3;
        }
      }
    `;

const ast = acorn.parse(code, {
  sourceType: "module",
  ecmaVersion: 7,
});

let indent = 0;

walk(ast, {
  enter(node) {
    if (node.type === "VariableDeclarator") {
      console.log(" ".repeat(indent * 4), "var:", node.id.name);
    }

    if (node.type === "FunctionDeclaration") {
      console.log(" ".repeat(indent * 4), "function:", node.id.name);

      indent++;
    }
  },
  leave(node) {
    if (node.type === "FunctionDeclaration") {
      indent--;
    }
  },
});
