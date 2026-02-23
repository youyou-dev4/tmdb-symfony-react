FROM php:8.4-cli

# Installer extensions nécessaires
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && docker-php-ext-install pdo

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]