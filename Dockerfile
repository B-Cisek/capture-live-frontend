# Build stage
FROM node:lts-alpine as build-stage

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=${VITE_APP_API_URL}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-only

COPY . .
# Production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
