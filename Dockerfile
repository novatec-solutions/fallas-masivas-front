FROM nginxinc/nginx-unprivileged

#COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

RUN apk update && \
    apk add nodejs npm make curl g++

RUN npm ci && npm run build

RUN rm -rf /usr/share/nginx/html/*

RUN cp -r /app/dist/fallas-masivas-front/* /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
