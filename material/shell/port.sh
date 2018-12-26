# 开放linux端口

# 进入编辑页面
vi /etc/sysconfig/iptables

# 开发5001端口
-A INPUT -p tcp -m state --state NEW -m tcp --dport 5001 -j ACCEPT

# 重启网卡服务
service iptables restart

# 查看端口开放信息
service iptables status
