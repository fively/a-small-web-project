const Bundle = require("../bundle");
const fs = require("fs");

jest.mock("fs");

describe("bundle 测试", () => {
//   it("fetchModule", () => {
//     const bundle = new Bundle({ entry: "./a.js" });
//     fs.readFileSync.mockReturnValueOnce("const a = 1;");

//     const module = bundle.fetchModule("index.js");

//     const { calls } = fs.readFileSync.mock;
//     expect(calls[0][0]).toBe("index.js");

//     expect(module.code.toString()).toBe("const a = 1;");
//   });

//   it("build - 单条语句", () => {
//     const bundle = new Bundle({ entry: "index.js" });
//     fs.readFileSync.mockReturnValueOnce("console.log(23)");

//     bundle.build("bundle.js");

//     const { calls } = fs.writeFileSync.mock;
//     expect(calls[0][0]).toBe("bundle.js");
//     expect(calls[0][1]).toBe("console.log(23)");
//   });

//   it("build - 多条语句", () => {
//     const bundle = new Bundle({ entry: "index.js" });
//     const code = `const a = () => 1;const b = () => 1;a();`;
//     fs.writeFileSync.mock.calls = [];
//     fs.readFileSync.mockReturnValueOnce(code);

//     bundle.build("bundle.js");

//     const { calls } = fs.writeFileSync.mock;
//     expect(calls[0][0]).toBe("bundle.js");
//     expect(calls[0][1]).toBe(`const a = () => 1;a();`);
//   });

  it("build - 多模块", () => {
    const bundle = new Bundle({ entry: "index.js" });
    fs.readFileSync
      .mockReturnValueOnce(`import { a } from './a'; a();`)
      .mockReturnValueOnce(`export const a = () => 1;`);

    fs.writeFileSync.mock.calls = [];
    bundle.build("bundle.js");

    const { calls } = fs.writeFileSync.mock;
    expect(calls[0][0]).toBe("bundle.js");
    expect(calls[0][1]).toBe(`const a = () => 1;a();`);
  });
});
