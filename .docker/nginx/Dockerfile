FROM nginx:latest

COPY hosts/nginx.conf /etc/nginx/sites-available/express

COPY config/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/sites-enabled

RUN ln -s /etc/nginx/sites-available/express /etc/nginx/sites-enabled/

RUN apt-get -yq update && apt-get install -yq nano less

RUN chmod a+w /var/log/nginx/*.log

RUN chmod a+w /var

RUN rm -f /var/log/nginx/*
