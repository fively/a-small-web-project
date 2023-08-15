const { ModuleFederationPlugin } = require('webpack').container

/**
 * 创建联邦模块
 * @param param0
 * @returns
 */
module.exports = ({ name, filename, exposes, shared }) => {
  return new ModuleFederationPlugin({ name, filename, exposes, shared })
}
