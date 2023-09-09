import webpack from 'webpack'
const { ModuleFederationPlugin } = webpack.container

const pluginName = 'PromiseRuntimeExternalPlugin'

class PromiseRuntimeExternalPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      const RuntimeGlobals = compiler.webpack.RuntimeGlobals
      if (compilation.outputOptions.trustedTypes) {
        compilation.hooks.additionalModuleRuntimeRequirements.tap(
          pluginName,
          (module, set, context) => {
            if (module.externalType === 'promise') {
              set.add(RuntimeGlobals.loadScript)
              set.add(RuntimeGlobals.require)
            }
          }
        )
      }
    })
  }
}

/**
 * 联邦模块
 * @param {*} config
 * @param {*} options
 * @returns
 */
export const useFederation = (config, options) => {
  const { federation } = options
  if (!federation) return

  const { mode, name, filename = '', exposes = {}, shared = {} } = federation

  /** 主应用增加 */
  if (mode === 'main') {
    config.plugins.push(new PromiseRuntimeExternalPlugin())
  }

  config.plugins.push(
    new ModuleFederationPlugin({ name, filename, exposes, shared })
  )
}
