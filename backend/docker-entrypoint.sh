#!/bin/bash
set -e

echo "============================================"
echo " Assessment System — Backend Bootstrap"
echo "============================================"

# -----------------------------------------------
# 1. Wait for MySQL to be ready
# -----------------------------------------------
echo "⏳ Waiting for MySQL at ${DB_HOST}:${DB_PORT:-3306}..."
until nc -z -w2 "${DB_HOST}" "${DB_PORT:-3306}" 2>/dev/null; do
    sleep 1
done
echo "✅ MySQL is ready."

# -----------------------------------------------
# 2. Generate APP_KEY if missing
# -----------------------------------------------
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# -----------------------------------------------
# 3. Run migrations
# -----------------------------------------------
echo "🗃  Running database migrations..."
php artisan migrate --force

# -----------------------------------------------
# 4. Install Passport encryption keys (idempotent)
# -----------------------------------------------
echo "🔐 Installing Passport keys..."
php artisan passport:install --force 2>/dev/null || \
    php artisan passport:keys --force 2>/dev/null || true

# -----------------------------------------------
# 5. Seed the database (only when empty)
# -----------------------------------------------
echo "🌱 Seeding database..."
php artisan db:seed --force 2>/dev/null || true

# -----------------------------------------------
# 6. Clear & cache configuration
# -----------------------------------------------
echo "🧹 Optimising configuration..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

echo "============================================"
echo " ✅  Backend ready — starting server"
echo "============================================"

# -----------------------------------------------
# 7. Start the Laravel development server
# -----------------------------------------------
exec php artisan serve --host=0.0.0.0 --port=8000
