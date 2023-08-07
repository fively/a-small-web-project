##### 项目配置husky

husky 官方文档地址：[Husky - Git hooks](https://typicode.github.io/husky/#/?id=install)

1、首先进入项目，查看.git文件夹所在目录，以what-apps为例

cd what-apps

ls -al



2、安装husky

```
pnpm i -D husky
```

安装成功后，启用git hooks

```
npx husky install
```

执行成功后，会在当前项目目录生成.husky 文件夹



3、配置eslint

```
pnpm i -D eslint
```

安装成功后，使用eslint进行初始化工作

```
npx eslint --init
```

初始化时，会有多个选项，此处根据自己需求来设置（项目使用的配置）

```
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard-with-typescript@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.0.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
```

初始化成功后，会生成 .eslintrc.json文件



4、安装 lint-staged

```
pnpm i -D lint-staged
```

在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。

但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。

package.json修改

```
"scripts": {
    "lint": "eslint apps",
    "lint-staged": "lint-staged",
    "test": "echo \"Error: no test specified\" && exit 1"
 },
```

```
"lint-staged": {
    "*.{js,jsx,tsx,ts}": [
      "npm run lint"
    ]
 }
```



5、创建 .husky 文件夹中 pre-commit 文件

pre-commit 用于git commit 提交时自动执行某些脚本检测代码

```
npx husky add .husky/pre-commit "npx lint-staged"
```



6、配置commitlint

```
pnpm i -D @commitlint/config-conventional @commitlint/cli
```

添加配置文件 commitlint.config.js

```
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```



7、创建 .husky 文件夹中 commit-msg 文件

commit-msg 用户git commit 提交时对 commit 消息和提交用户进行验证

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```



8、至此配置结束，可以git commit 检测

```
git status
git add .
git commit -m '123'
```



注意：配置的时候遇到的一些问题

1、在core-web目录中，执行npx husky install 时，会提示: .git can't be found， 是由于.git 文件夹在根目录，不在此目录，若要在当前目录配置，需要指定目录

```
cd ../.. && npx husky install apps/core-web/.husky
```

官方文档中也有相应介绍：[Husky - Git hooks](https://typicode.github.io/husky/#/?id=install) (搜索"front")



2、在1中多级目录husky install 后，在apps/core-web 下创建commitlint.config.js文件并配置commit-msg如下：

```
npx --no -- commitlint --edit "$1"
```

在git commit 执行commit-msg文件时，

会提示"**Please add rules to your `commitlint.config.js`**"，

是因为commitlint.config.js文件一直加载的是根目录下的文件，因此需要使用--config指定配置文件，如下：

```
npx --no -- commitlint --config ./apps/core-web/commitlint.config.js --edit "${1}"
```
