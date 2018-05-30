FROM tutum/nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx.conf
RUN mkdir /etc/nginx/ssl
COPY certs/server.key /etc/nginx/ssl/server.key
COPY certs/server.crt /etc/nginx/ssl/server.crt
ADD sites-enabled/ /etc/nginx/sites-enabled