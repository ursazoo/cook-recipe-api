####################
## BUILD FOR LOCAL DEVELOPMENT
####################
#
##FROM node:18.14-alpine As development
##
###WORKDIR /usr/src/app
### 初始化工作目录
##RUN mkdir -p /server
##WORKDIR /server
##
##COPY --chown=node:node package*.json ./
##
##RUN npm ci
##
##COPY --chown=node:node . .
##
##USER node
##
#####################
### BUILD FOR PRODUCTION
#####################
##
##FROM node:18.14-alpine As build
##
###WORKDIR /usr/src/app
##WORKDIR /server
##
##COPY --chown=node:node prisma ./prisma/
##
##COPY --chown=node:node package*.json ./
##
##COPY --chown=node:node  .env ./
##
##COPY --chown=node:node  tsconfig.json ./
##
###COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
##COPY --chown=node:node --from=development /server/node_modules ./node_modules
##
##COPY --chown=node:node . .
###COPY  --chown=node:node ./src .
##
##RUN npm run build
##
##ENV NODE_ENV production
##
##RUN npm ci --only=production && npm cache clean --force
##
##RUN npx prisma generate
##
##USER node
##
#####################
### PRODUCTION
#####################
##
##FROM node:18.14-alpine As production
##
###COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
###COPY --chown=node:node --from=build /usr/src/app/dist ./dist
##COPY --chown=node:node --from=build /server/node_modules ./node_modules
##COPY --chown=node:node --from=build /server/dist ./dist
##
##COPY --chown=node:node --from=build /server .
##
##ENV RUN_TIME_ENV local
##
##CMD ["node", "dist/src/main.js"]
#
##CMD [ "node", "dist/src/main.js" ]
##
##EXPOSE 3000
##
##ENTRYPOINT ["npm", "run"]
##
##CMD ["start:dev"]
#
#
##FROM node:18.14-alpine
##
##RUN mkdir -p /home/app/
##
##WORKDIR /home/app/
##
##COPY package*.json ./
##
##COPY prisma ./prisma/
##
##COPY .env ./
##
##COPY tsconfig.json ./
##
##COPY . .
##
##RUN npm install
##
##RUN npx prisma generate
##
##EXPOSE 3000
##
##ENTRYPOINT ["npm", "run"]
##
##CMD ["start:dev"]
#
#
#
####################
## BUILD FOR LOCAL DEVELOPMENT
####################
#
##FROM node:18-alpine As development
##
##WORKDIR /usr/src/app
##
##COPY --chown=node:node package*.json ./
##
##RUN npm ci
##
##COPY --chown=node:node . .
##
##USER node
#
####################
## BUILD FOR PRODUCTION
####################
#
#FROM node:18-alpine As build
#
#WORKDIR /usr/src/app
#
#COPY --chown=node:node package*.json ./
#
## RUN npm ci
#
##COPY --chown=node:node /usr/src/app/node_modules ./node_modules
#
#ENV NODE_ENV production
#
#RUN npm ci --only=production && npm cache clean --force
#
#COPY --chown=node:node . .
#
## RUN npm run build
#
## RUN npx prisma generate
#
#USER node
#
####################
## PRODUCTION
####################
#
#FROM node:18-alpine As production
#
#WORKDIR /usr/src/app
#
##COPY --chown=node:node package*.json ./
#
## RUN npm ci --only=production && npm cache clean --force
#
##COPY --chown=node:node /usr/src/app/node_modules ./node_modules
#
#COPY --chown=node:node . .
#
#RUN npm run build
#
#RUN npx prisma generate
#
##COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
#COPY --chown=node:node --from=build /usr/src/app/dist ./dist
#
##RUN npx prisma migrate dev
#
#CMD [ "node", "dist/src/main.js" ]
#
##FROM nginx:1.23.3-alpine as production
##
##COPY --from=build-stage /app/dist /usr/share/nginx/html
##
##COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
##
##EXPOSE 80
##
##CMD ["nginx", "-g", "daemon off;"]


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