import * as React from 'react'
/**
 * 懒加载
 * @param loader
 * @returns
 */
export const lazily = <T extends {}, U extends keyof T>(loader: (x?: string) => Promise<T>) =>
  new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol) => {
      if (typeof componentName === 'string') {
        return React.lazy(() =>
          loader(componentName).then((x) => ({
            default: x[componentName as U] as any as React.ComponentType<any>
          }))
        )
      }
    }
  })

export const lazy = React.lazy
