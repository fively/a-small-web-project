const path = require("path");
const fs = require("fs");
const Module = require("./ module");
const { default: MagicString } = require("magic-string");

class Bundle {
  constructor({ entry }) {
    this.entryPath = entry.replace(/\.js$/, "");
  }

  /**
   * 加载模块
   * @param {*} importee  被调用者
   * @param {*} importer 调用者
   */
  fetchModule(importee, importer) {
    let router;
    if (!importer) {
      router = importee;
    } else {
      // 计算相对于importer的路径
      if (path.isAbsolute(importee)) {
        router = importee;
      } else {
        // 相对路径
        router = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js$/, "") + ".js"
        );
      }
    }

    if (router) {
      // 读取代码
      const code = fs.readFileSync(router, "utf-8").toString();
      const module = new Module({ code, path: router, bundle: this }); // bundle = 上下文

      return module;
    }
  }

  /**
   * 构建
   * @param {*} outputFileName
   */
  build(outputFileName) {
    const enterModule = this.fetchModule(this.entryPath);
    this.statements = enterModule.expandAllStatement();

    const { code } = this.generate();

    fs.writeFileSync(outputFileName, code, "utf-8");
  }

  /**
   *
   */
  generate() {
    const magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      // export const a = 1; => const a = 1;
      if (statement.type === "ExportNamedDeclaration") {
        source.remove(statement.start, statement.declaration.start);
      }

      magicString.addSource({
        content: source,
        separator: "",
      });

    });

    return { code: magicString.toString() };
  }
}

module.exports = Bundle;
