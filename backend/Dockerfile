FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN echo "APP_ENV=prod" > .env && \
    echo "APP_SECRET=changeme" >> .env && \
    echo "TMDB_API_KEY=" >> .env && \
    echo "DEFAULT_URI=http://localhost:8000" >> .env

RUN composer install --no-interaction --prefer-dist --no-scripts

RUN composer dump-autoload --optimize

EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]