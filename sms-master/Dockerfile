#FROM nginx


### Packaging application
FROM node:8-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm i -g typescript && npm install --production
COPY . .
RUN npm run tsc \
    && npm uninstall -g typescript \
    && mkdir -p /root/app \
    && mv src/dist \
        .sequelizerc \
        node_modules package*.json \
        /root/app \
    && mv src/assets/ /root/app/ \
    && rm -rf /usr/src/app && mv /root/app /usr/src/app

EXPOSE 5000

CMD ["node", "./dist/app"]



## OLD WORKING DOCKERFILE

#FROM grpc/go
#
##FROM registry.gitlab.com/jptres/docker/grpc-node
#
#WORKDIR /usr/src/app
#
#ENV GOPATH=/root/go
#
#RUN \
#    go get -u google.golang.org/grpc && \
#    go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway && \
#    go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger && \
#    go get -u github.com/golang/protobuf/protoc-gen-go
#
#COPY package*.json ./
#COPY tsconfig.json ./
#RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs
#RUN npm install
#COPY . .
#RUN npm run tsc
#
#EXPOSE 8080 50051
#
#CMD [ "npm", "start" ]
