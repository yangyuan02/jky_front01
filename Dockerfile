FROM alpine:3.7
MAINTAINER guxiaobai <sikuan.gu@gmail.com>

RUN echo 'http://mirrors.aliyun.com/alpine/edge/community' >> /etc/apk/repositories
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk update && apk add yarn nodejs

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
