# A Small Web Project



## 介绍

最近得空，就想着自己搭建个项目玩玩。项目中尽量没有用现成的脚手架，一方面是学习，另一方面是想着自己尝试下。

技术栈选的是React，没选Vue，主要考虑的一点是，React生态中可选的库太多太多(对于选择困难户的我来说，也是蛮痛苦的)，自己选择，自己搭建，寻找探索的过程，也是痛并快乐着。

构建工具选的是Webpack5。为啥没选Vite呢，主要也是因为Webpack5的Module Federation，亲生的，想用它不用再加载插件之类的。

后端服务，用的是Node来做，选用的是Nestjs（真香）。





## 想法

想做个页面的壳，然后其他的页面以地址或者插件的形式接入，这是我觉得最理想的状态了。

所以想到微前端，参考了[例子](https://github.com/module-federation/module-federation-examples)，最终选择了共享路由模式，比较贴近我想要的。





## 技术栈

包管理：pnpm（monorepo模式）

构建工具：Webpack5

前端库：React、React-Router、zustand、AntdUI、Axios

后端服务：Nestjs、MySql、Knex、Redis、pm2





## 项目结构

-- apps 项目页面地址

        -- shell-web 页面主体部分，加载所有路由

-- packages 项目公共包





## 安装

```
pnpm install -w
```





## 启动

启动方式：pnpm dev <app_name>:[<config>]

```
pnpm dev core-web
或 
pnpm dev core-web:dashboard
```





## Buil构建

打包方式：pnpm build <app_name>:[<config>]

```
pnpm build core-web
```

注：pnpm启动单个项目时，语句有点长，所以才用shell脚本方式做了简化

（自看shell指令写的sh文件，有点low。至于为啥这么干，就觉得用的顺手）





## 参考资料

网站、github、及博客教程等（参考的比较多，就不一一列出了。）