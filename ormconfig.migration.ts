import { DataSource } from 'typeorm';
import { config } from 'dotenv';
// import dbConfig from './ormconfig';

const dbConfig = require('./ormconfig.js');

config();

// const configService = new ConfigService();

let dataSource: DataSource = new DataSource({
  // type: dbConfig.type,
  // host: dbConfig.host,
  // port: dbConfig.port,
  // username: dbConfig.username,
  // password: dbConfig.password,
  // database: dbConfig.database,
  // entities: dbConfig.entities,
  // migrations: dbConfig.migrations,
  ...dbConfig,
});

// switch (process.env.NODE_ENV) {
//   case 'development':
//     dataSource = new DataSource({
//       type: 'sqlite',
//       database: 'db.sqlite',
//       entities: ['**/*.entity.js'],
//       migrations: ['migrations/*.js'],
//     });
//     break;
//   case 'test':
//     dataSource = new DataSource({
//       type: 'sqlite',
//       database: 'test.sqlite',
//       entities: ['**/*.entity.ts'],
//       migrations: ['migrations/*.js'],
//     });
//     break;
//   case 'production':
//   default:
//     throw new Error('unknown environment');
// }

export default dataSource;

// module.exports = dbConfig;
