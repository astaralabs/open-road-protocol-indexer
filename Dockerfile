ARG BUILD_VERSION='prod'

FROM node:22 as base

ARG DEPLOY_ENV
ARG SYMMETRIC_KEY
ARG INITIALIZATION_VECTOR
ARG POSTGRES_SCHEMA
ARG DATABASE_SCHEMA

ENV DEPLOY_ENV=${DEPLOY_ENV} \
  SYMMETRIC_KEY=${SYMMETRIC_KEY} \
  INITIALIZATION_VECTOR=${INITIALIZATION_VECTOR} \
  POSTGRES_SCHEMA=${POSTGRES_SCHEMA} \
  DATABASE_SCHEMA=${DATABASE_SCHEMA}

FROM base as local
COPY astara.pem /root/astara.pem
ENV NODE_EXTRA_CA_CERTS=/root/astara.pem

FROM base as prod
ENV NODE_ENV=production

FROM ${BUILD_VERSION} AS final
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y awscli jq

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 42069