## run migration sample

npx cross-env NODE_ENV=production DATABASE_URL=<url> npm run typeorm migration:generate ./migrations/update-user-add-resetPasswordExpires -- -d ormconfig.migration.ts -o

#npm run typeorm migration:run -- -d ormconfig.migration.ts
