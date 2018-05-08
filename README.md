![burger](https://github.com/bashleigh/areyouinfordinner-app/blob/design/public/burger.png?raw=true)

Are You In For Dinner API :fork_and_knife: :pizza: :taco:
===

An API for tracking if you're in for dinner or not. To stop the arguments about who did or didn't say they were or weren't in for dinner. Built to prove my mum wrong.

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
yarn schema:sync
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

### Logging queries

Add `"logging": true` to `ormconfig.json` to display typeorm logs.


## Assets 

Start building assets with 

```bash
yarn assets:start
```

