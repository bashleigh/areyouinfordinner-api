Are You In For Dinner API
===

An API for tracking if you're in for dinner or not.

## Setup 

Copy the `.env.dist` and `ormconfig.json.dist` files renaming and removing the `.dist` part. 

```bash
cp .env.dist .env && cp .ormconfig.json.dist ormconfig.json
```

### Docker 

Run docker via the compose setup 

```bash
docker-compose up -d
```

### Migrations 

For development or pre-build applications (working in ts) use `yarn schema:sync` which will sync your database with the entities rather than migration files.

```bash
yar schema:sync
```

For production env, use
```bash
yarn migrate
```

To run your migrations backwards use 

```bash
yarn migrate:revert
```

More information about typeorm migrations [here.](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)