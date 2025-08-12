FROM node:21-alpine3.18 AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
# RUN npm install -g npm@latest
RUN npm ci && npm run build
RUN npx prisma db push

FROM node:21-alpine3.18

WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
COPY tsconfig.json ./
# RUN npm install -g pm2 npm@latest
RUN npm install -g pm2 
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4010

CMD [ "npm", "run", "start" ]
