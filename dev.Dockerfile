# 使用 node 镜像
FROM node:18.14-alpine

# 初始化工作目录
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 复制 package.json
COPY package*.json /usr/src/app/

# 安装依赖
RUN npm install

# 复制文件
COPY . /usr/src/app/

# 开启 dev
CMD ["npm", "run", "start:dev"]