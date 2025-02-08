# Stage 1: Build the application
FROM node:23-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]