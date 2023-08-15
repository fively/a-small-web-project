const Scope = require("./scope");
const walk = require("./walk");

function analyse(ast, magicString, module) {
  let scope = new Scope({});

  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      _defines: { value: {} },
      _dependsOn: { value: {} },
      _included: { value: false, writable: true },
      _source: { value: magicString.snip(statement.start, statement.end) },
    });

    function addToScope(declaration) {
      const name = declaration.id.name;
      scope.add(name);

      console.log("scope:", scope);

      if (!scope.parent) {
        statement._defines[name] = true;
      }
    }

    walk(statement, {
      enter(node) {
        let newScope = null;
        if (node.type === "VariableDeclaration") {
          node.declarations.forEach((n) => {
            addToScope(n);
            // if (n.type === "VariableDeclarator") {
            //   addToScope(n);
            // }
          });
        } else if (node.type === "FunctionDeclaration") {
          // 函数变量时，创建新的作用域
          addToScope(node);
          const params = node.params.map((p) => p.name);
          newScope = new Scope({ parent: scope, params });
        }

        if (newScope) {
          Object.defineProperties(node, {
            _scope: { value: newScope },
          });
          scope = newScope;
        }
      },
      leave(node) {
        if (node._scope) {
          scope = scope.parent;
        }
      },
    });
  });

  Object.defineProperties(ast, {
    _scope: { value: scope },
  });

  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node.type === "Identifier") {
          statement._dependsOn[node.name] = true;
        }
      },
    });
  });
}

module.exports = analyse;
