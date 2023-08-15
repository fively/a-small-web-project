const Scope = require("../scope");

describe("测试作用域", () => {
  it("父子关系", () => {
    const root = new Scope({});
    root.add("a");

    const child = new Scope({
      parent: root,
    });

    child.add("b");

    expect(child.contains("b")).toBe(true);
    expect(child.contains("a")).toBe(true);

    expect(child.findDefineScope("a")).toEqual(root);
    expect(child.findDefineScope("b")).toEqual(child);
  });
});
