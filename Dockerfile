FROM harbor.changtech.cn/common/base-nginx:v1

#维护者
MAINTAINER 2542823317@qq.com

# 修改编码集
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8


# 修改时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone


# 包
WORKDIR /opt

ADD ./dist.tar.gz /opt/dist


EXPOSE 80 443
