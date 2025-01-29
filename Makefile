.PHONY: pem
pem:
	cp ~/astara.pem . 2>/dev/null || :

.PHONY: build
build: pem
	docker compose build

.PHONY: build-ci
build-ci:
	docker compose build --build-arg BUILD_VERSION=prod

.PHONY: test
test: pem
	docker compose run --rm test

.PHONY: dev
dev: pem
	docker compose up open-road-protocol-indexer

.PHONY: dev-sh
dev-sh: pem
	docker compose run --rm open-road-protocol-indexer /bin/bash
