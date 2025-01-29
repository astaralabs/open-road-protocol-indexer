ARG BUILD_VERSION='prod'

FROM node:22 as base

ARG DEPLOY_ENV
ARG SYMMETRIC_KEY


ENV DEPLOY_ENV=${DEPLOY_ENV} \
  ALCHEMY_URL_BASE_SEPOLIA=${ALCHEMY_URL_BASE_SEPOLIA} 

FROM base as local
COPY astara.pem /root/astara.pem
ENV NODE_EXTRA_CA_CERTS=/root/astara.pem

FROM base as prod
ENV NODE_ENV=production

FROM ${BUILD_VERSION} AS final
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install -g ponder@0.8.33

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
