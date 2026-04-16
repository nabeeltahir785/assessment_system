# ============================================================================
# Assessment System — Laravel Backend
# Multi-stage Dockerfile: dev (default) and production targets
# ============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Base PHP image with extensions
# ---------------------------------------------------------------------------
FROM php:8.1-fpm AS base

# System dependencies for PHP extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libzip-dev \
        libonig-dev \
        libxml2-dev \
        unzip \
        git \
        curl \
        netcat-openbsd \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        xml \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ---------------------------------------------------------------------------
# Stage 2: Development target (default)
# ---------------------------------------------------------------------------
FROM base AS dev

# Copy application code
COPY . .

# Install all dependencies (including dev)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Fix storage permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]

# ---------------------------------------------------------------------------
# Stage 3: Production target
# ---------------------------------------------------------------------------
FROM base AS production

COPY . .

# Production-only dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
