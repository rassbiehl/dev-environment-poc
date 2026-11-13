.PHONY: frontend backend lint lint-fix format format-check test coverage check help

help:
	@echo "Available commands:"
	@echo ""
	@echo "  make frontend       Start frontend development server"
	@echo "  make backend        Start backend development server"
	@echo "  make lint           Run ESLint"
	@echo "  make lint-fix       Run ESLint with automatic fixes"
	@echo "  make format-check   Check code formatting with Prettier"
	@echo "  make test           Run frontend and backend unit tests"
	@echo "  make coverage       Run unit tests with coverage"
	@echo "  make check          Run lint, formatting checks and tests"
	@echo "  make help           Show available commands"

frontend:
	docker compose exec frontend npm run dev -- --host 0.0.0.0

backend:
	docker compose exec backend npm run dev

lint:
	docker compose exec frontend npm --prefix /workspace run lint

lint-fix:
	docker compose exec frontend npm --prefix /workspace run lint:fix

format-check:
	docker compose exec frontend npm run format:check
	docker compose exec backend npm run format:check

test:
	docker compose exec frontend npm run test:unit
	docker compose exec backend npm run test:unit

coverage:
	npm run test:coverage

check: lint format-check test