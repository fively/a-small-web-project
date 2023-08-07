# Nginx安装

##### 一、当前环境

Centos版本：8.x

##### 二、创建nginx.repo文件

在/etc/yum.repos.d/ 中创建 nginx.repo文件，文件内容
(部分服务器已经包含此文件):

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

##### 三、安装

yum install nginx

##### 四、增加nginx的gzip

1、修改nginx配置文件nginx.conf:

```
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml+rss application/xml text/javascript application/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;
```

2、关闭版本号

```
server_tokens off; #nginx.conf 文件
```