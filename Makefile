# ============================================================================
#  Assessment System — Makefile
#  One-command project setup: make start
# ============================================================================

.PHONY: help start up down restart build rebuild \
        logs logs-backend logs-frontend logs-mysql \
        backend-shell frontend-shell mysql-shell \
        migrate migrate-fresh seed \
        test test-backend lint-frontend \
        composer-install npm-install \
        clean nuke status ps \
        passport-install artisan cache-clear

# Colours
CYAN  := \033[36m
GREEN := \033[32m
YELLOW:= \033[33m
RED   := \033[31m
RESET := \033[0m

# ============================================================================
#  Default target
# ============================================================================
help: ## Show this help
	@echo ""
	@echo "$(CYAN)Assessment System$(RESET) — Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-22s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ============================================================================
#  🚀 Quick Start
# ============================================================================
start: ## 🚀 First-time setup — build, start, and seed everything
	@echo "$(CYAN)╔══════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║   🚀 Assessment System — Full Project Setup     ║$(RESET)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════╝$(RESET)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)📋 Creating .env from .env.example...$(RESET)"; \
		cp .env.example .env; \
	fi
	@echo "$(GREEN)🔨 Building containers...$(RESET)"
	docker compose build
	@echo "$(GREEN)🟢 Starting services...$(RESET)"
	docker compose up -d
	@echo ""
	@echo "$(GREEN)╔══════════════════════════════════════════════════╗$(RESET)"
	@echo "$(GREEN)║   ✅ Assessment System is running!               ║$(RESET)"
	@echo "$(GREEN)╠══════════════════════════════════════════════════╣$(RESET)"
	@echo "$(GREEN)║                                                  ║$(RESET)"
	@echo "$(GREEN)║   Frontend:    http://localhost:3000              ║$(RESET)"
	@echo "$(GREEN)║   Backend:     http://localhost:8000              ║$(RESET)"
	@echo "$(GREEN)║   API:         http://localhost:8000/api          ║$(RESET)"
	@echo "$(GREEN)║   phpMyAdmin:  http://localhost:8080              ║$(RESET)"
	@echo "$(GREEN)║   Mailpit:     http://localhost:8025              ║$(RESET)"
	@echo "$(GREEN)║                                                  ║$(RESET)"
	@echo "$(GREEN)╚══════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo "$(YELLOW)💡 Run 'make logs' to tail all service logs$(RESET)"

# ============================================================================
#  Container Lifecycle
# ============================================================================
up: ## Start all containers (detached)
	docker compose up -d

down: ## Stop all containers
	docker compose down

restart: ## Restart all containers
	docker compose restart

build: ## Build all images (cached)
	docker compose build

rebuild: ## Rebuild all images from scratch (no cache)
	docker compose build --no-cache

status: ## Show container status
	docker compose ps

ps: status ## Alias for status

# ============================================================================
#  Logs
# ============================================================================
logs: ## Tail logs for all services
	docker compose logs -f

logs-backend: ## Tail backend logs
	docker compose logs -f backend

logs-frontend: ## Tail frontend logs
	docker compose logs -f frontend

logs-mysql: ## Tail MySQL logs
	docker compose logs -f mysql

# ============================================================================
#  Shell Access
# ============================================================================
backend-shell: ## Open a shell in the backend container
	docker compose exec backend bash

frontend-shell: ## Open a shell in the frontend container
	docker compose exec frontend sh

mysql-shell: ## Open MySQL CLI
	docker compose exec mysql mysql -u root -p$(or $(DB_ROOT_PASSWORD),rootpassword) $(or $(DB_DATABASE),assessment_db)

# ============================================================================
#  Laravel Commands
# ============================================================================
artisan: ## Run an artisan command (usage: make artisan CMD="migrate:status")
	docker compose exec backend php artisan $(CMD)

migrate: ## Run database migrations
	docker compose exec backend php artisan migrate --force

migrate-fresh: ## Drop all tables and re-run all migrations
	docker compose exec backend php artisan migrate:fresh --force

seed: ## Run database seeders
	docker compose exec backend php artisan db:seed --force

migrate-seed: ## Fresh migration + seed (full DB reset)
	docker compose exec backend php artisan migrate:fresh --seed --force

passport-install: ## Install/reinstall Passport encryption keys
	docker compose exec backend php artisan passport:install --force

cache-clear: ## Clear all Laravel caches
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear

# ============================================================================
#  Dependency Management
# ============================================================================
composer-install: ## Run composer install in the backend
	docker compose exec backend composer install

npm-install: ## Run npm install in the frontend
	docker compose exec frontend npm install

composer-require: ## Add a composer package (usage: make composer-require PKG="vendor/package")
	docker compose exec backend composer require $(PKG)

npm-add: ## Add an npm package (usage: make npm-add PKG="package-name")
	docker compose exec frontend npm install $(PKG)

# ============================================================================
#  Testing
# ============================================================================
test: test-backend ## Run all tests

test-backend: ## Run backend PHPUnit tests
	docker compose exec backend php artisan test

lint-frontend: ## Run frontend linter
	docker compose exec frontend npm run lint

# ============================================================================
#  Cleanup
# ============================================================================
clean: ## Stop containers and remove volumes
	@echo "$(YELLOW)⚠  Stopping containers and removing volumes...$(RESET)"
	docker compose down -v
	@echo "$(GREEN)✅ Cleaned up.$(RESET)"

nuke: ## ☢️  Full nuclear cleanup — removes containers, volumes, images, and cached data
	@echo "$(RED)☢️  Nuclear cleanup — this will destroy EVERYTHING$(RESET)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	docker compose down -v --rmi all --remove-orphans
	@echo "$(GREEN)✅ Nuked.$(RESET)"
