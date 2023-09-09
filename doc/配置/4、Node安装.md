# Node环境安装

##### 一、当前环境

Centos版本：8.x

##### 二、Node包下载

可以在本地下载node.js最新版，然后通过ftp工具上传到服务器，
或者

直接在服务器终端使用wget命令下载：

```
wget https://nodejs.org/dist/v20.5.0/node-v20.5.0-linux-x64.tar.gz
```

##### 三、解压

进入服务器终端，找到上传或者下载的安装包，解压：

```
tar -zvxf node-v20.5.0-linux-x64.tar.gz
```

##### 四、移动或重命名

```
mv node-v20.5.0-linux-x64 /usr/lib/node
#移动node-v18.13.0-linux-x64文件内容至/usr/lib/node目录
```

##### 五、配置环境变量

vi /etc/profile (或直接服务器端打开)
在文件最后增加如下内容

```
#对应第三步mv的目录
export NODE_HOME=/usr/lib/node
export PATH=$NODE_HOME/bin:$PATH
#vi编辑器：i 输入 ，:wq 为保存并退出
```

##### 六、重启环境

```
source /etc/profile
```

##### 七、查看版本

```
node -v
npm -v
```

##### 八、安装常用插件

```
npm -g i pnpm
npm -g i pm2
```