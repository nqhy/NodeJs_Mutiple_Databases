import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

import '../helpers/env';

export const mongoConfig = {
  mongoURL: process.env.MONGO_URL,
};

interface MysqlConfig {
  [key: string]: ConnectionOptions;
}

const baseConfig: MysqlConfig = {
  type: 'mysql',
  entities: ['../entities/*.ts'],
  synchronize: true,
  logging: true,
};

export const mysqlConfig: MysqlConfig = {
  devlopment: {
    ...baseConfig,
    host: process.env.MYSQL_HOST_DEV,
    port: process.env.MYSQL_PORT_DEV,
    username: process.env.MYSQL_USER_DEV,
    password: process.env.MYSQL_PASSWORD_DEV,
    database: process.env.MYSQL_DB_NAME_DEV,
  },
  test: {
    ...baseConfig,
    host: process.env.MYSQL_HOST_TEST,
    port: process.env.MYSQL_PORT_TEST,
    username: process.env.MYSQL_USER_TEST,
    password: process.env.MYSQL_PASSWORD_TEST,
    database: process.env.MYSQL_DB_NAME_TEST,
  },
  production: {
    ...baseConfig,
    host: process.env.MYSQL_HOST_PROD,
    port: process.env.MYSQL_PORT_PROD,
    username: process.env.MYSQL_USER_PROD,
    password: process.env.MYSQL_PASSWORD_PROD,
    database: process.env.MYSQL_DB_NAME_PROD,
  },
};
