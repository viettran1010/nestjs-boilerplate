## run migration sample

npm run typeorm migration:generate ./migrations/initial-schema -- -d ormconfig.migration.ts -o

npm run typeorm migration:run -- -d ormconfig.migration.ts
