const analyse = require("../analyse");
const acorn = require("acorn");
const MagicString = require("magic-string");

const getCode = (code) => {
  return {
    ast: acorn.parse(code, {
      locations: true,
      ranges: true,
      ecmaVersion: 7,
      sourceType: "module",
    }),
    magicString: new MagicString(code),
  };
};

describe("analyse分析", () => {
  it("作用域测试1", () => {
    const { ast, magicString } = getCode(`
      const a = 1;
      function f1(){
        const b = 2;
      }
    `);
    analyse(ast, magicString);

    expect(ast._scope.contains("a")).toBe(true);
    expect(ast._scope.contains("b")).toBe(false);
    expect(ast._scope.findDefineScope("a")).toEqual(ast._scope);
    expect(ast.body[0]._defines).toEqual({ a: true });
    expect(ast.body[0]._dependsOn).toEqual({ a: true });
    expect(ast.body[1]._dependsOn).toEqual({ f1: true, b: true });
  });
});
