class Scope {
  constructor(options) {
    this.parent = options.parent;
    this.names = options.names || [];
    this.params = options.params || [];
  }

  /**
   * 添加变量
   */
  add(name) {
    if (this.names) {
      this.names.push(name);
    } else {
      this.names = [name];
    }
  }

  /**
   * 判断是否包含变量
   * @param {*} name
   * @returns
   */
  contains(name) {
    return !!this.findDefineScope(name);
  }

  /**
   * 查找作用域
   * @param {*} name
   */
  findDefineScope(name) {
    if (this.names.includes(name)) {
      return this;
    } else if (this.parent) {
      return this.parent.findDefineScope(name);
    } else {
      return null;
    }
  }
}

module.exports = Scope;
