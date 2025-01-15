# REACT-VITE example
# using node to compile the app
FROM node:23-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# using nginx as a web server to host our application
FROM nginx:latest AS host
COPY --from=build /app/dist /usr/share/nginx/html
