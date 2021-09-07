FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
COPY ./ /app/
RUN npm i
RUN CI=true npm test
RUN npm run build


FROM nginx:stable
COPY --from=builder /app/build /usr/share/nginx/html
