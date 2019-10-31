# base image
FROM node:12.2.0-alpine

# set working directory
RUN mkdir -p /usr/src/chat-app
WORKDIR /chat-app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /chat-app/node_modules/.bin:$PATH

COPY package.json /chat-app/package.json

EXPOSE 3000

# start app
CMD ["npm", "start"]
