# GitLab安装

##### 一、当前环境

centos8.2

##### 二、域名

需要指定个域名，增加解析，例如：gitlab.xxxx.com

三、安装gitlab（安装的是极狐gitlab）
官方安装手册：https://gitlab.cn/install/

```
sudo yum install -y curl policycoreutils-python openssh-server perl
sudo systemctl enable sshd
sudo systemctl start sshd
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
```

执行时提示：FirewallD is not running，我这边忽略掉继续执行了，未发现有啥影响

1、下载/安装极狐GitLab

```
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
```

2、设置安装后的访问地址

```
sudo EXTERNAL_URL="https://gitlab.xxxx.com" yum install -y gitlab-jh
```

3、登录的初始密码存储位置

/etc/gitlab/initial_root_password

4、修改端口号
修改 /etc/gitlab/gitlab.rb文件

5、初始化并重启组件：

```
gitlab-ctl reconfigure
gitlab-ctl restart
```
