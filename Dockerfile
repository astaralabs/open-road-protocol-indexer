ARG BUILD_VERSION='prod'

FROM node:22 as base

ARG DEPLOY_ENV
ARG DATABASE_SCHEMA


ENV DEPLOY_ENV=${DEPLOY_ENV} \
  ALCHEMY_URL_BASE_SEPOLIA=${ALCHEMY_URL_BASE_SEPOLIA} \
  DATABASE_SCHEMA=${DATABASE_SCHEMA}

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

COPY . .

EXPOSE 42069

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
