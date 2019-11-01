import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

import '../helpers/env';

export const mongoConfig = {
  mongoURL: process.env.MONGO_URL,
};

export const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  entities: ['../entities/*.ts'],
  synchronize: true,
};
