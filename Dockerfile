FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npm install
run npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/my-task-board/browser /usr/share/nginx/static
COPY nginx.conf /etc/nginx/nginx.conf
COPY  mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]