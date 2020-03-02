FROM nginx:1.16-alpine
WORKDIR /srv/app
COPY build/ /srv/app
COPY templates/default.nginx /etc/nginx/default.template
CMD envsubst '\$SERVER_NAME \$SSL_ENABLED \$BACKEND_ADDR' < /etc/nginx/default.template > /etc/nginx/nginx.conf && exec nginx
