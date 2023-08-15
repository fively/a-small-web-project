const acorn = require("acorn");
const walk = require("../walk");
const fs = require("fs");

describe("walk 测试", () => {
  it("单节点", () => {
    const mockEnter = jest.fn();

    const mockLeave = jest.fn();

    const code = {
      a: {
        b: 1,
      },
      c: 2,
    };

    walk(code, { enter: mockEnter, leave: mockLeave });

    const callEnter = mockEnter.mock.calls;
    expect(callEnter[0][0]).toEqual({ a: { b: 1 }, c: 2 });
    expect(callEnter[1][0]).toEqual({ b: 1 });

    const callLeave = mockLeave.mock.calls;
    expect(callLeave[0][0]).toEqual({ b: 1 });
    expect(callLeave[1][0]).toEqual({ a: { b: 1 }, c: 2 });
  });
});
