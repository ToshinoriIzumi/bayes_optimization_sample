FROM node:lts-buster

RUN apt-get update && \
    apt-get install vim -y && \
    npm install -g npm@9.8.1 && \
    groupadd -g 1100 app_user && \
    useradd -m -s /bin/bash -u 1100 -g 1100 app_user

RUN mkdir -p /opt/app/.npm
COPY ./code/frontend/package.json /opt/app
COPY ./code/frontend/package-lock.json /opt/app
RUN chown -R app_user:app_user /opt/app
WORKDIR /opt/app

USER app_user
RUN npm install
