const acorn = require("acorn");
const anaylse = require("./analyse");
const MagicString = require("magic-string");

function has(obj, prop) {
  return Object.prototype.hasOwnProperty(obj, prop);
}

const SYSTEM_VARS = ["console", "log"];

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code);
    this.path = path;
    this.bundle = bundle;

    this.ast = acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    });

    this.analyse();
  }

  analyse() {
    this.imports = {};
    this.exports = {};
    this.definitions = {};

    this.ast.body.forEach((node) => {
      if (node.type === "ImportDeclaration") {
        const source = node.source.value;
        node.specifiers.forEach((specifier) => {
          if (specifier.type === "ImportSpecifier") {
            const localName = specifier.local.name;
            const name = specifier.imported.name;

            this.imports[localName] = {
              localName,
              name,
              source,
            };
          }
        });
      } else if (/^Export/.test(node.type)) {
        const declaration = node.declaration;

        if (declaration.type === "VariableDeclaration") {
          declaration.declarations.forEach((varNode) => {
            if (varNode.type === "VariableDeclarator") {
              const localName = varNode.id.name;

              this.exports[localName] = {
                localName,
                node,
                expression: declaration,
              };
            }
          });
        }
      }
    });

    anaylse(this.ast, this.code, this);
    console.log("this.ast.body:", this.ast.body);
    this.ast.body.forEach((statement) => {
      console.log("statement._defines:", statement._defines);
      Object.keys(statement._defines).forEach((key) => {
        console.log("key:", key);
        this.definitions[key] = statement;
      });
    });
  }

  expandAllStatement() {
    const allStatements = [];

    this.ast.body.forEach((statement) => {
      // 忽略import 和 变量声明
      if (statement.type === "ImportDeclaration") return;
      if (statement.type === "VariableDeclaration") return;

      const statements = this.expandStatement(statement);

      allStatements.push(...statements);
    });

    return allStatements;
  }

  expandStatement(statement) {
    statement._included = true;
    const result = [];

    const dependencies = Object.keys(statement._dependsOn);
    dependencies.forEach((key) => {
      const definitions = this.define(key);

      result.push(...definitions);
    });

    result.push(statement);

    return result;
  }

  /**
   * 查找变量声明
   * @param {*} name
   */
  define(name) {
    // import 模块外
    if (has(this.imports, name)) {
      // TODO 加载模块
      const importDeclaration = this.imports[name];
      const module = this.bundle.fetchModule(
        importDeclaration.source,
        this.path
      );

      const exportData = module.exports[importDeclaration.name];

      return module.define(exportData.localName);
    } else {
      // 模块内
      console.log("definitions:", this.definitions);
      const statement = this.definitions[name];

      if (statement) {
        if (statement._included) return [];

        return this.expandStatement(statement);
      } else if (SYSTEM_VARS.includes(name)) {
        return [];
      } else {
        throw new Error("找不到变量：" + name);
      }
    }
  }
}

module.exports = Module;
