# Stage 1

FROM node:lts-alpine as build-step
RUN mkdir -p /app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2

FROM nginx:latest as prod
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]