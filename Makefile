.PHONY: frontend backend lint lint-fix format format-check test coverage check

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