FROM node:alpine
WORKDIR /app
COPY ./ /app/
RUN npm i

ARG PORT=5000
EXPOSE ${PORT}
CMD [ "node", "server.js" ]
