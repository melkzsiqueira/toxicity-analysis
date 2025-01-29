FROM node:22.13.1-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production
FROM nginx:alpine
COPY --from=build /app/dist/toxicity-analysis/browser /usr/share/nginx/html
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
