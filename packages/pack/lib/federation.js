import webpack from 'webpack'
const { ModuleFederationPlugin } = webpack.container

/**
 * 联邦模块
 * @param {*} config
 * @param {*} options
 * @returns
 */
export const useFederation = (config, options) => {
  const { federation } = options
  if (!federation) return

  const { name, filename, exposes, shared } = federation

  config.plugins.push(
    new ModuleFederationPlugin({ name, filename, exposes, shared })
  )
}
