###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.14-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.14-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node prisma ./prisma/

COPY --chown=node:node package*.json ./

COPY --chown=node:node  .env ./

COPY --chown=node:node  tsconfig.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .
#COPY  --chown=node:node ./src .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

RUN npx prisma generate

USER node

###################
# PRODUCTION
###################

FROM node:18.14-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ENV RUN_TIME_ENV local

#CMD [ "node", "dist/src/main.js" ]

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start:dev"]


#FROM node:18.14-alpine
#
#RUN mkdir -p /home/app/
#
#WORKDIR /home/app/
#
#COPY package*.json ./
#
#COPY prisma ./prisma/
#
#COPY .env ./
#
#COPY tsconfig.json ./
#
#COPY . .
#
#RUN npm install
#
#RUN npx prisma generate
#
#EXPOSE 3000
#
#ENTRYPOINT ["npm", "run"]
#
#CMD ["start:dev"]
