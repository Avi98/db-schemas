To start the postgres docker container

```shell
docker run --name postgres-container -e POSTGRES_PASSWORD='postgres' \
-e POSTGRES_USER='postgres' \
-e POSTGRES_DB='postgres' \
-p 5432:5432 postgres:15-alpine

```
