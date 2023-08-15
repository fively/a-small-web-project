function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}

function visit(node, parent, enter, leave) {
  if (!node) return;

  if (enter) {
    enter.call(null, node, parent);
  }

  const objKeys = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );

  objKeys.forEach((key) => {
    const value = node[key];
    visit(value, node, enter, leave);
  });

  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;
