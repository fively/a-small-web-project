# Jenkins安装

##### 一、当前环境

centos8.2

##### 二、安装

参考官方文档： https://pkg.jenkins.io/redhat-stable/

执行指令：

```
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

安装：

```
yum install fontconfig java-11-openjdk
yum install jenkins
```

ps: 因为对jenkins不熟悉，算是刚开始安装， 执行完上面的指令后，其实挺懵的，也不知道接下来咋访问。后来就接着百度。

以下是我的处理流程：

1、设置端口号
配置文件地址:/etc/sysconfig/jenkins 中的：JENKINS_PORT="8090"

```
systemctl daemon-reload  #重新加载配置文件
```

ps: 设置端口号后，我根据服务器ip地址+端口号的方式，进行访问，发现访问不了（此时服务器安全组8090端口已经开了）

2、服务器查看jenkins启动情况

```
systemctl status jenkins  #查看jenkins运行状态
```

ps: 显示一直在 start : (Active: activating (start))，页面一直卡在等待页面

3、执行重启

```
systemctl stop jenkins
systemctl restart jenkins 
# 或
systemctl start jenkins
```

ps: 执行的时候，一直会卡死。 能够stop，但是start和restart都执行不了

4、权限问题？
百度了下，有的文章说可能是账号权限问题，然后需要修改配置文件
/etc/sysconfig/jenkins JENKINS_USER="root"

```
systemctl daemon-reload  #重新加载配置文件
```

ps: 结果还是不行

5、Url问题？
后来继续百度，看大家也遇到类似问题
原因：jenkins里面文件指向国外的官网，因为防火墙的原因连不上
修改url地址
修改文件地址：/var/lib/jenkins/hudson.model.UpdateCenter.xml
地址修改为： http://mirror.xmission.com/jenkins/updates/update-center.json

ok，成功重启。

接下来就是按ip+端口号访问，按步骤next
