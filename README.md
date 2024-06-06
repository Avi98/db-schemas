To start the postgres docker container

## Start database for e-commerce

```shell
docker run --name postgres-container -e POSTGRES_PASSWORD='postgres' \
-e POSTGRES_USER='postgres' \
-e POSTGRES_DB='postgres' \
-p 5432:5432 postgres:15-alpine

```

## Start database for e-commerce

```shell
docker run --name postgres-social-media-container -e POSTGRES_PASSWORD='postgres' \
-e POSTGRES_USER='postgres' \
-e POSTGRES_DB='postgres-social-media' \
-p 5432:5432 postgres:15-alpine

```

## Start server for social-media

```shell
pnpm run dev-social-media

```
