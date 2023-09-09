/**
 * 使用devserver
 * @param {*} config
 * @param {*} options
 */
export const useDevServer = (config, options) => {
  if (config.mode === 'production') return

  config.devServer = {
    port: 3001,
    https: false,
    hot: true,
    liveReload: true,
    client: {
      overlay: false
    },
    historyApiFallback: true,
    ...options.devServer
  }
}
