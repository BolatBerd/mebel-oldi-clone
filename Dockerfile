# Этап 1: Сборка Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Этап 2: Nginx
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=build /app/dist/mebel-oldi-clone/browser /usr/share/nginx/html

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
